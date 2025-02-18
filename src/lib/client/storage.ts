import bridge from '@expressms/smartapp-bridge'
import { ClientStorageGetResponse, ERROR_CODES, METHODS, StatusResponse, StorageValueType } from '../../types'

/**
 * Get value for key from client storage
 * @param key Key
 * @returns Promise that'll be fullfilled with `payload.value` on success, otherwise rejected with reason
 */
const clientStorageGet = ({ key }: { key: string }): Promise<ClientStorageGetResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.CLIENT_STORAGE_GET,
      params: { key },
      hide_recv_event_data: true
    })
    .then(event => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { payload }: { payload: any } = event

      const deserializedValue = payload.value && JSON.parse(payload.value)

      return {
        ...event,
        payload: {
          ...payload,
          value: deserializedValue,
        },
      } as ClientStorageGetResponse
    })
}

/**
 * Save value in client storage
 * @param key Key
 * @param value Data to be stored
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
const clientStorageSet = ({ key, value }: { key: string; value: StorageValueType }): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  const serializedValue = JSON.stringify(value)

  return bridge
    .sendClientEvent({
      method: METHODS.CLIENT_STORAGE_SET,
      params: {
        key,
        value: serializedValue,
      },
      hide_send_event_data: true,
    })
    .then(event => event as StatusResponse)
}

/**
 * Remove record from client storage
 * @param key Key
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
const clientStorageRemove = ({ key }: { key: string }): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.CLIENT_STORAGE_REMOVE,
      params: { key },
    })
    .then(event => event as StatusResponse)
}

/**
 * Clear all records from client storage
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
const clientStorageClear = (): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.CLIENT_STORAGE_CLEAR,
      params: {},
    })
    .then(event => event as StatusResponse)
}

export { clientStorageGet, clientStorageSet, clientStorageRemove, clientStorageClear }
