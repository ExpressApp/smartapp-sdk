import bridge from '@expressms/smartapp-bridge'
import { ERROR_CODES, METHODS, NfcReadTagResponse, NfcWriteMessage, StatusResponse } from '../../types'

/**
 * Read NFC tag
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

/**
 * Write NFC tag
 * @param messages List of messages to be wtitten
 * @returns Promise that'll be fullfilled on success, otherwise rejected with reason
 */
export const writeTag = (messages: Array<NfcWriteMessage>): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.WRITE_NFC_TAG,
      params: {
        messages,
      },
    })
    .then(event => event as StatusResponse)
}
