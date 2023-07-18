import bridge from "@expressms/smartapp-bridge"
import { METHODS } from "../types"

const bridgeSendReady = (timeout?: number) => {
  const event = {
    method: METHODS.READY,
    params: {},
  }
  return bridge?.sendClientEvent(timeout ? { ...event, timeout } : event)
}

export {
  bridgeSendReady,
}
