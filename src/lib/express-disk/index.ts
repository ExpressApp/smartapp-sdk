import bridge from '@expressms/smartapp-bridge'
import { ERROR_CODES, METHODS } from '../../types'
import { GetAuthCodeResponse } from '../../types/express-disk'

/**
 * Get auth code for eXpress Disk
 * @returns Promise that'll be fullfilled with `payload.auth` on success, otherwise rejected with reason
 */
export const getAuthCode = (): Promise<GetAuthCodeResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.GET_EXPRESS_DISK_AUTH_CODE,
      params: {},
      hide_recv_event_data: true,
    })
    .then(event => event as GetAuthCodeResponse)
}
