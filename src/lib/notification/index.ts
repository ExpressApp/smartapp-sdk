import bridge from '@unlimited/smartapp-bridge'
import { EVENT_TYPES } from '../../types'

const onNotification = async (handleNotification: Function) => {
  const response = await bridge?.sendClientEvent({
    method: EVENT_TYPES.NOTIFICATION,
    params: {},
  })

  return bridge?.onReceive((event) => {
    if (event.type === EVENT_TYPES.NOTIFICATION) handleNotification(response)
  })
}

export {
  onNotification,
}
