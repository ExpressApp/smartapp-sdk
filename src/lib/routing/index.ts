import bridge from "@expressms/smartapp-bridge"
import { LOCATION, METHODS } from '../../types'

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
