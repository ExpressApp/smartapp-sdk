import bridge from "@expressms/smartapp-bridge"
import { LOCATION, METHODS } from "../../types"

/**
 * @param isRoot
 */
const routingChanged = (isRoot: boolean) => {
  return bridge?.sendClientEvent({
    method: METHODS.ROUTING_CHANGED,
    params: {
      location: isRoot ? LOCATION.ROOT : LOCATION.NESTED,
    },
  })
}

/**
 * @param handleBackPressed
 */
const onBackPressed = (handleBackPressed: Function) => {
  return bridge?.onReceive((event: any) => {
    if (event.type === METHODS.BACK_PRESSED) handleBackPressed()
  })
}

/**
 * @param appId
 * @param meta
 */
const openSmartApp = (appId: string, meta?: any) => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_SMART_APP,
    params: {
      appId,
      meta,
    },
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
  exitSmartAppToCatalog,
}
