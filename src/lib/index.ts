import bridge from "@expressms/smartapp-bridge"
import { METHODS } from "../types"

export const bridgeSendReady = (timeout?: number) => {
  const event = {
    method: METHODS.READY,
    params: {},
  }
  return bridge?.sendClientEvent(timeout ? { ...event, timeout } : event)
}
