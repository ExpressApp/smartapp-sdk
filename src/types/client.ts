import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter'
import { File, STATUS } from './bridge'

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
