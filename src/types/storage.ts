import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter'
import { STATUS } from './bridge'

export enum CLIENT_STORAGE_ERROR_CODES {
  keyNotFound = 'key_not_found',
  valueSizeExceeded = 'value_size_exceeded',
  storageLimitReached = 'storage_limit_reached',
}

export type StorageValueType = string | number | null | object | boolean | []
export type StorageErrorType = CLIENT_STORAGE_ERROR_CODES | null

export interface ClientStorageGetResponse extends EmitterEventPayload {
  payload: {
    status: STATUS,
    errorCode?: string | null,
    value: StorageValueType
  }
}
