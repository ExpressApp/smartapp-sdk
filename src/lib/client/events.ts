import bridge from '@expressms/smartapp-bridge'
import { ERROR_CODES, METHODS, STATUS, SubscriptionEventType } from '../../types'

const subscriptions: Array<{ eventType: SubscriptionEventType; callback?: Function }> = []
let bridgeEventListenerInstalled = false

const isAnySubscriptionsOfType = (eventType: SubscriptionEventType) => {
  return subscriptions.some(sub => sub.eventType == eventType)
}

const installBridgeEventListener = () => {
  if (bridgeEventListenerInstalled || !bridge) return

  bridgeEventListenerInstalled = true

  bridge.onReceive(event => {
    subscriptions.filter(sub => sub.eventType === event.type).map(sub => sub.callback?.(event))
  })
}

/**
 * Subscribe to special client events
 * @param eventType Event from SubscriptionEventType enum to be subscribed
 * @param callback Optional function to be handled when event is coming
 * @returns Promise that'll be fullfilled on successful subscription, otherwise rejected with reason
 */
const subscribeClientEvents = (eventType: SubscriptionEventType, callback?: Function): Promise<{ status: string }> => {
  const successResponse = { status: STATUS.SUCCESS }

  // No need to subscribe event twice on client
  if (isAnySubscriptionsOfType(eventType)) {
    subscriptions.push({ eventType, callback })
    return Promise.resolve(successResponse)
  }

  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.SUBSCRIBE_CLIENT_EVENTS,
      params: {
        event: eventType,
      },
    })
    .then(() => {
      installBridgeEventListener()
      subscriptions.push({ eventType, callback })
      return successResponse
    })
}

/**
 * Unsubscribe from previously subscribed client events
 * @param eventType Event from SubscriptionEventType enum to be unsubscribed
 * @param callback Function to be unsibscribed
 * @returns Promise that'll be fullfilled on successful unsubscription, otherwise rejected with reason
 */
const unsubscribeClientEvents = (eventType: SubscriptionEventType, callback?: Function): Promise<{ status: string }> => {
  const successResponse = { status: STATUS.SUCCESS }

  const index = subscriptions.findIndex(sub => sub.eventType == eventType && sub.callback == callback)

  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)
  if (index == -1) return Promise.reject(ERROR_CODES.SUBSCRIPTION_NOT_FOUND)

  subscriptions.splice(index, 1)

  // Send unsubscribe to client only at last subscription
  if (isAnySubscriptionsOfType(eventType)) return Promise.resolve(successResponse)

  return bridge
    .sendClientEvent({
      method: METHODS.UNSUBSCRIBE_CLIENT_EVENTS,
      params: {
        event: eventType,
      },
    })
    .then(() => successResponse)
}

export { subscribeClientEvents, unsubscribeClientEvents }
