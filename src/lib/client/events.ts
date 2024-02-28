import bridge from '@expressms/smartapp-bridge'
import { ERROR_CODES, METHODS, STATUS, StatusResponse, SubscriptionEventType, SubscriptionPayload } from '../../types'

const subscriptions: Array<{ id: string; callback?: Function }> = []
let bridgeEventListenerInstalled = false

const composeResponse = (status: STATUS, errorCode?: string): StatusResponse => {
  return {
    payload: {
      status,
      errorCode
    },
  } as StatusResponse
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSubscriptionId = (eventType: SubscriptionEventType, payload?: any) => {
  const sourceId = payload?.id ? '-' + payload?.id : ''
  const sourceType = payload?.type ? '-' + payload?.type : ''

  return `${eventType}${sourceType}${sourceId}`
}

const isAnySubscriptions = (eventType: SubscriptionEventType, payload?: SubscriptionPayload) => {
  const id = getSubscriptionId(eventType, payload)

  return subscriptions.some(sub => sub.id == id)
}

const installBridgeEventListener = () => {
  if (bridgeEventListenerInstalled || !bridge) return

  bridgeEventListenerInstalled = true

  bridge.onReceive(event => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id = getSubscriptionId(event.type as SubscriptionEventType, (event.payload as any).source)

    subscriptions.filter(sub => sub.id === id).map(sub => sub.callback?.(event))
  })
}

/**
 * Subscribe to special client events
 * @param eventType Event from SubscriptionEventType enum to be subscribed
 * @param payload Additional params, for example `{ id: 'email-app', type: 'smartapp' }`
 * @param callback Optional function to be handled when event is coming
 * @returns Promise that'll be fullfilled on successful subscription, otherwise rejected with reason
 */
const subscribeClientEvents = ({
  eventType,
  payload,
  callback,
}: {
  eventType: SubscriptionEventType
  payload?: SubscriptionPayload
  callback?: Function
}): Promise<StatusResponse> => {
  // No need to subscribe event twice on client
  if (isAnySubscriptions(eventType, payload)) {
    const id = getSubscriptionId(eventType, payload)

    subscriptions.push({ id, callback })
    return Promise.resolve(composeResponse(STATUS.SUCCESS))
  }

  if (!bridge) return Promise.reject(composeResponse(STATUS.ERROR, ERROR_CODES.NO_BRIDGE))

  return bridge
    .sendClientEvent({
      method: METHODS.SUBSCRIBE_CLIENT_EVENTS,
      params: {
        event: eventType,
        ...payload,
      },
    })
    .then((event) => {
      const response = event as StatusResponse
      const id = getSubscriptionId(eventType, payload)

      if (response.payload.status !== STATUS.SUCCESS) return response
      
      installBridgeEventListener()
      subscriptions.push({ id, callback })
      
      return response
    })
}

/**
 * Unsubscribe from previously subscribed client events
 * @param eventType Event from SubscriptionEventType enum to be unsubscribed
 * @param payload Additional params, for example `{ id: 'email-app', type: 'smartapp' }`
 * @param callback Function to be unsibscribed
 * @returns Promise that'll be fullfilled on successful unsubscription, otherwise rejected with reason
 */
const unsubscribeClientEvents = ({
  eventType,
  payload,
  callback,
}: {
  eventType: SubscriptionEventType
  payload?: SubscriptionPayload
  callback?: Function
}): Promise<StatusResponse> => {
  const id = getSubscriptionId(eventType, payload)
  const index = subscriptions.findIndex(sub => sub.id == id && sub.callback == callback)

  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)
  if (index == -1) return Promise.resolve(composeResponse(STATUS.ERROR, ERROR_CODES.SUBSCRIPTION_NOT_FOUND))

  subscriptions.splice(index, 1)
  
  // Send unsubscribe to client only at last subscription
  if (isAnySubscriptions(eventType, payload)) return Promise.resolve(composeResponse(STATUS.SUCCESS))

  return bridge
    .sendClientEvent({
      method: METHODS.UNSUBSCRIBE_CLIENT_EVENTS,
      params: {
        event: eventType,
        ...payload,
      },
    })
    .then((event) => event as StatusResponse)
}

export { subscribeClientEvents, unsubscribeClientEvents }
