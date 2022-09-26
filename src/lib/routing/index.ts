import bridge from '@expressms/smartapp-bridge'
import { LOCATION, METHODS } from '../../types'

const routingChanged = async (isRoot: boolean) => {
  return bridge?.sendClientEvent({
    method: METHODS.ROUTING_CHANGED,
    params: {
      location: isRoot ? LOCATION.ROOT : LOCATION.NESTED,
    },
  })
}


const onBackPressed = async (handleBackPressed: Function) => {
  return bridge?.onReceive((event) => {
    if (event.type === METHODS.BACK_PRESSED) handleBackPressed()
  })
}

const openSmartApp = async (appId: string, meta?: never) => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_SMART_APP,
    params: {
      appId,
      meta,
    }
  })
}

const exitSmartAppToCatalog = async () => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_SMART_APP,
    params: {
      appId: ''
    }
  })
}

export {
  routingChanged,
  onBackPressed,
  openSmartApp,
  exitSmartAppToCatalog,
}
