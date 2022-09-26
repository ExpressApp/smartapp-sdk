import bridge from '@expressms/smartapp-bridge'
import { METHODS } from '../../types'

const onNotification = async (handleNotification: Function) => {
  const response = await bridge?.sendClientEvent({
    method: METHODS.NOTIFICATION,
    params: {},
  })

  return bridge?.onReceive((event: any) => {
    if (event.type === METHODS.NOTIFICATION) handleNotification(response)
  })
}

export {
  onNotification,
}
