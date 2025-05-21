import bridge from '@expressms/smartapp-bridge'
import { METHODS } from '../../types'

/**
 * Request GPS position
 * @returns Promise that'll be fullfilled with `payload.*` on success, otherwise rejected with reason
 */
export const requestLocation = () => {
  return bridge?.sendClientEvent({
    method: METHODS.REQUEST_LOCATION,
    params: {},
  })
}
