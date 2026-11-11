import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter'
import { File, STATUS } from './bridge'

export enum FILE_DOWNLOAD_ERROR_CODE {
  DOWNLOAD_FORBIDDEN = 'download_forbidden',
  STORAGE_PERMISSION_DENIED = 'storage_permission_denied',
  FILE_TOO_LARGE = 'file_too_large',
  ALREADY_IN_PROGRESS = 'already_in_progress',
  ACCESS_DENIED = 'access_denied',
  ANTIVIRUS_THREAT_FOUND = 'antivirus_threat_found',
  DLP_ERROR = 'dlp_error',
  NOT_FOUND = 'not_found',
  FILE_NOT_FOUND = 'file_not_found',
  WRONG_FILE_HASH = 'wrong_file_hash',
  NETWORK_ERROR = 'network_error',
  IO_ERROR = 'io_error',
  ERROR = 'error',
}

export type GetConnectionStatusResponse = {
  ref: string
  payload: {
    connectionStatus: 'connected' | 'disconnected'
  }
}

export type CreateDeeplinkResponse = {
  ref: string
  payload: {
    status: 'error' | 'success'
    errorCode?: string
    data?: {
      deeplink: string
    }
  }
}

export type LocalPhonebookEntry = {
  avatar: string | null
  name: string | null
  contacts: {
    contactType: string
    contact: string
  }[]
}

export interface SearchLocalPhonebookResponse extends EmitterEventPayload {
  payload: {
    status: STATUS
    errorCode?: string | null
    localPhonebookEntries: Array<LocalPhonebookEntry>
  }
}

export type GetUnreadCounterResponse = {
  ref: string
  payload: {
    status: STATUS
    errorCode?: string | null
    unreadCounter: number
  }
}

export type GetLayoutTypeResponse = {
  ref: string
  payload: {
    status: STATUS
    errorCode?: string | null
    layoutType: "minimal" | "full" | "half"
  }
}

export type UploadFileTypeResponse = {
  ref: string
  payload: {
    status: STATUS
    errorCode?: string | null
    record: File
  }
}

export type UploadFilesTypeResponse = {
  ref: string
  payload: {
    status: STATUS
    errorCode?: string | null
    records: File[]
  }
}

export type FileDownloadTypeResponse = {
  ref: string
  payload: {
    status: STATUS
    errorCode?: FILE_DOWNLOAD_ERROR_CODE | string | null
  }
}

export type GetAppVisibilityResponse = {
  ref: string
  payload: {
    status: STATUS
    errorCode?: string | null
    visible: boolean
  }
}

export interface SmartAppListEntry {
  appId: string
  id: string
  enabled: boolean
  name: string
}

export interface GetSmartAppListResponse extends Omit<EmitterEventPayload, 'payload'> {
  payload: {
    status: STATUS
    errorCode?: string | null
    smartappList: SmartAppListEntry[],
  }
}

export interface CookieItem {
  value: string
}
