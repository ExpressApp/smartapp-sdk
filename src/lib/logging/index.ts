import bridge from '@expressms/smartapp-bridge'
import { bridgeSendReady } from '../index'

// TODO remove when logsEnabled and enableLogs are in Bridge
type BridgeResponse = {
  payload: {
    logsEnabled: boolean
  }
}

type Bridge = {
  enableLogs: Function
}

const ready = async (timeout?: number) => {
  const response = await bridgeSendReady(timeout) as unknown as BridgeResponse
  const Bridge = bridge as unknown as Bridge
  const isLogsEnabled = response?.payload?.logsEnabled

  if (isLogsEnabled) Bridge?.enableLogs?.()

  return response
}

export {
  ready
}
