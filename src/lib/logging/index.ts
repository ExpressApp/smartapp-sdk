import bridge from "@expressms/smartapp-bridge"
import { ERROR_CODES, ReadyEventResponse } from "../../types"
import { bridgeSendReady } from "../index"

const ready = async (timeout?: number) => {
  const response = await bridgeSendReady(timeout) as ReadyEventResponse
  const isLogsEnabled = response?.payload?.logsEnabled

  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  if (isLogsEnabled) bridge.enableLogs?.()

  return response
}

export {
  ready,
}