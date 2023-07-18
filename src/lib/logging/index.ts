import bridge from "@expressms/smartapp-bridge"
import { ReadyEventResponse } from "../../types"
import { bridgeSendReady } from "../index"

const ready = async (timeout?: number) => {
  const response = await bridgeSendReady(timeout) as ReadyEventResponse
  const isLogsEnabled = response?.payload?.logsEnabled

  if (isLogsEnabled) (bridge as any)?.enableLogs?.()

  return response
}

export {
  ready,
}