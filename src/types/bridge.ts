import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter'


export enum METHODS {
  READY = 'ready',
  ROUTING_CHANGED = 'routing_changes',
  BACK_PRESSED = 'back_pressed',
  MOVE_TO_ROOT = 'move_to_root',
  ADD_CONTACT = 'add_contact',
  GET_CONTACT = 'get_contact',
  CREATE_PERSONAL_CHAT = 'create_personal_chat',
  SEND_MESSAGE = 'send_message',
  NOTIFICATION = 'notification',
  OPEN_SMART_APP = 'open_smart_app',
  OPEN_CLIENT_SETTINGS = 'open_client_settings',
  GET_CHATS = 'get_chats',
  SEARCH_CORPORATE_PHONEBOOK = 'search_corporate_phonebook',
  SEND_BOT_COMMAND = 'send_bot_command',
  OPEN_GROUP_CHAT = 'open_group_chat',
  OPEN_CONTACT_CARD = 'open_contact_card',
  REQUEST_LOCATION = 'request_location',
  REQUEST_SELF_PROFILE = 'request_self_profile',
  CLOSE_SMART_APP = 'close_smart_app',
  OPEN_FILE = 'open_file',
  SUBSCRIBE_CLIENT_EVENTS = 'subscribe_client_events',
  UNSUBSCRIBE_CLIENT_EVENTS = 'unsubscribe_client_events',
  GET_CONNECTION_STATUS = 'get_connection_status',
  CREATE_DEEPLINK = 'create_deeplink',
  OPEN_CHAT_MESSAGE = 'open_chat_message',
  CLIENT_STORAGE_GET = 'client_storage_get',
  CLIENT_STORAGE_SET = 'client_storage_set',
  CLIENT_STORAGE_REMOVE = 'client_storage_remove',
  CLIENT_STORAGE_CLEAR = 'client_storage_clear',
}

export enum STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum ERROR_CODES {
  NO_BRIDGE = 'no_bridge',
  SUBSCRIPTION_NOT_FOUND = 'subscription_not_found',
}

export type ReadyEventResponse = ({
  ref: string,
  status: STATUS.SUCCESS,
  payload: {
    logsEnabled?: boolean,
    isMain?: boolean,
    type: string,
    openSmartAppMeta?: object,
  },
}) | undefined

export interface File {
  type: string | null
  file: string
  fileMimeType: string | null
  fileName: string | null
  filePreview: string | null
  filePreviewHeight: number | null
  filePreviewWidth: number | null
  fileSize: number
  fileHash: string | null
  fileEncryptionAlgo: string | null
  chunkSize: number | null
  fileId: string | null
  key: {} | null
}

export interface StatusResponse extends EmitterEventPayload {
  payload: {
    status: STATUS
    errorCode?: string | null,
  }
}