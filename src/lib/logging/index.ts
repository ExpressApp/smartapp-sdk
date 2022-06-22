import bridge from '@unlimited/smartapp-bridge'
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

const ready: ({ timeout }: { timeout?: number }) => Promise<boolean> = async ({ timeout }) => {
  const response = await bridgeSendReady({ timeout }) as unknown as BridgeResponse
  const Bridge = bridge as unknown as Bridge

  const isLogsEnabled = response?.payload?.logsEnabled

  if (isLogsEnabled) Bridge?.enableLogs?.()

  return new Promise(resolve => resolve(isLogsEnabled))
}

export {
  ready
}
