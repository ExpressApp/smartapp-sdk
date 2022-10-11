import bridge from "@expressms/smartapp-bridge"
import { bridgeSendReady } from "../index"

/**
 * @param timeout
 */
const ready = async (timeout?: number) => {
  const response = await bridgeSendReady(timeout) as any
  const Bridge = bridge as any
  const isLogsEnabled = response?.payload?.logsEnabled

  if (isLogsEnabled) Bridge?.enableLogs?.()

  return response
}

export {
  ready,
}
