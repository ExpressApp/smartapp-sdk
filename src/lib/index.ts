import bridge from '@unlimited/smartapp-bridge'
import { EVENT_TYPES } from '../types'

const bridgeSendReady = async () => {
  return bridge?.sendClientEvent({
    method: EVENT_TYPES.READY,
    params: {},
  })
}

export {
  bridgeSendReady
}
