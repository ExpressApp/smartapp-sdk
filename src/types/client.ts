import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter'
import { STATUS } from './bridge'

export enum SubscriptionEventType {
  CONNECTION_STATUS = "connection_status",
}

export type GetConnectionStatusResponse = ({
  ref: string,
  payload: {
    connectionStatus: "connected" | "disconnected",
  }
})

export type CreateDeeplinkResponse = ({
  ref: string,
  payload: {
    status: 'error' | 'success',
    errorCode?: string,
    data?: {
      deeplink: string,
    }
  }
})

type LocalPhonebookEntry = ({
  avatar: string | null,
  name: string | null,
  contacts: {
    contactType: string,
    contact: string,
  }[],
})

export interface SearchLocalPhonebookResponse extends EmitterEventPayload {
  payload: {
    status: STATUS,
    errorCode?: string | null,
    localPhonebookEntries: Array<LocalPhonebookEntry>,
  }
}
