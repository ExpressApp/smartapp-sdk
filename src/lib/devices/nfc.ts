import bridge from '@expressms/smartapp-bridge'
import {
  ERROR_CODES,
  METHODS,
  NfcReadTagResponse,
} from '../../types'

/**
 * Enable bluetooth
 * @returns Promise that'll be fullfilled with `payload.nfcTag` on success, otherwise rejected with reason
 */
export const readTag = (): Promise<NfcReadTagResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.READ_NFC_TAG,
      params: {},
    })
    .then(event => event as NfcReadTagResponse)
}
