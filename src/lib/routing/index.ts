import bridge from '@unlimited/smartapp-bridge'
import { EVENT_TYPES, LOCATION } from '../../types'

const routingChanged = async (isRoot: boolean) => {
  return bridge?.sendClientEvent({
    method: EVENT_TYPES.ROUTING_CHANGED,
    params: {
      location: isRoot ? LOCATION.ROOT : LOCATION.NESTED,
    },
  })
}


const onBackPressed = async (handleBackPressed: Function) => {
  return bridge?.onReceive((event) => {
    if (event.type === EVENT_TYPES.BACK_PRESSED) handleBackPressed()
  })
}

export {
  routingChanged,
  onBackPressed,
}
