import bridge from "@expressms/smartapp-bridge"
import { ERROR_CODES, ReadyEventResponse } from "../../types"
import { disableCopy } from "../helpers/helpers"
import { bridgeSendReady } from "../index"

export const ready = async (timeout?: number) => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  const response = await bridgeSendReady(timeout) as ReadyEventResponse
  
  const isLogsEnabled = response?.payload?.logsEnabled
  const isCopyDisabled = !!response?.payload?.rules?.find(rule => rule.action === 'copy')

  if (isLogsEnabled) bridge.enableLogs()
  if (isCopyDisabled) disableCopy()

  return response
}
