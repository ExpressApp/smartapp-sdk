import bridge from "@expressms/smartapp-bridge"
import { LOCATION, METHODS } from "../../types"

const routingChanged = (isRoot: boolean) => {
  return bridge?.sendClientEvent({
    method: METHODS.ROUTING_CHANGED,
    params: {
      location: isRoot ? LOCATION.ROOT : LOCATION.NESTED,
    },
  })
}

const onBackPressed = (handleBackPressed: Function) => {
  return bridge?.onReceive((event: any) => {
    if (event.type === METHODS.BACK_PRESSED) handleBackPressed()
  })
}

const openSmartApp = (appId: string, meta?: any) => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_SMART_APP,
    params: {
      appId,
      meta,
    },
  })
}

const onMoveToRoot = (handleMoveToRoot: Function) => {
  return bridge?.onReceive(event => {
    if (event.type === METHODS.MOVE_TO_ROOT) handleMoveToRoot()
  })
}

const exitSmartAppToCatalog = () => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_SMART_APP,
    params: {
      appId: "",
    },
  })
}

export {
  routingChanged,
  onBackPressed,
  openSmartApp,
  onMoveToRoot,
  exitSmartAppToCatalog,
}
