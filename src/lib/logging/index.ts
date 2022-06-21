import bridge from '@unlimited/smartapp-bridge'
import { bridgeSendReady } from '../index'

const ready: () => Promise<boolean> = async () => {
  const response = await bridgeSendReady() as unknown as {
    payload: {
      logsEnabled: boolean
    }
  }
  const Bridge = bridge as unknown as {
    enableLogs: Function
  }
  // TODO fix when enableLogs is present in bridge

  const isLogsEnabled = response?.payload?.logsEnabled

  if (isLogsEnabled) Bridge?.enableLogs?.()

  return new Promise(resolve => resolve(isLogsEnabled))
}

export {
  ready
}
