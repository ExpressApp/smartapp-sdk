import bridge from '@expressms/smartapp-bridge'
import { ERROR_CODES, LOCATION, METHODS, StatusResponse } from '../../types'

export const routingChanged = (isRoot: boolean) => {
  return bridge?.sendClientEvent({
    method: METHODS.ROUTING_CHANGED,
    params: {
      location: isRoot ? LOCATION.ROOT : LOCATION.NESTED,
    },
  })
}

export const onBackPressed = (handleBackPressed: Function) => {
  return bridge?.onReceive(event => {
    if (event.type === METHODS.BACK_PRESSED) handleBackPressed()
  })
}

export const openSmartApp = ({ appId, meta }: { appId: string; meta?: object }) => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_SMART_APP,
    params: meta ? { appId, meta } : { appId },
  })
}

export const closeSmartApp = () => {
  return bridge?.sendClientEvent({
    method: METHODS.CLOSE_SMART_APP,
    params: {},
  })
}

export const onMoveToRoot = (handleMoveToRoot: Function) => {
  return bridge?.onReceive(event => {
    if (event.type === METHODS.MOVE_TO_ROOT) handleMoveToRoot()
  })
}

export const exitSmartAppToCatalog = () => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_SMART_APP,
    params: { appId: '' },
  })
}

/**
 * Switch on/off swipe navigation in WkWebView
 * @param allowed Enable/disable navigation
 */
const allowSwipeNavigation = (allowed: boolean): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.ALLOW_IOS_SWIPE_NAVIGATION,
      params: { allowed },
    })
    .then(event => event as StatusResponse)
}

export const iOS = {
  allowSwipeNavigation,
}
