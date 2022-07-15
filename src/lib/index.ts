import bridge from '@unlimited/smartapp-bridge'
import { EVENT_TYPES } from '../types'

const bridgeSendReady = async (timeout?: number) => {
  const event = {
    method: EVENT_TYPES.READY,
    params: {},
  }
  return bridge?.sendClientEvent(timeout ? { ...event, timeout } : event)
}

export {
  bridgeSendReady
}
