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
  UPLOAD_FILE = 'upload_file',
  UPLOAD_FILES = 'upload_files',
  SUBSCRIBE_CLIENT_EVENTS = 'subscribe_client_events',
  UNSUBSCRIBE_CLIENT_EVENTS = 'unsubscribe_client_events',
  GET_CONNECTION_STATUS = 'get_connection_status',
  CREATE_DEEPLINK = 'create_deeplink',
  OPEN_CHAT_MESSAGE = 'open_chat_message',
  CLIENT_STORAGE_GET = 'client_storage_get',
  CLIENT_STORAGE_SET = 'client_storage_set',
  CLIENT_STORAGE_REMOVE = 'client_storage_remove',
  CLIENT_STORAGE_CLEAR = 'client_storage_clear',
  HANDLE_DEEPLINK = 'handle_deeplink',
  SEARCH_LOCAL_PHONEBOOK = 'search_local_phonebook',
  GET_UNREAD_COUNTER = 'get_unread_counter',
  GET_LAYOUT_TYPE = 'get_layout_type',
  CLEAN_CACHE = 'clean_cache',
  GET_APP_VISIBILITY = 'get_app_visibility',
  GET_SMARTAPP_LIST = 'get_smartapp_list',
  SET_WEB_RESOURCE_COOKIES = 'set_web_resource_cookies',
  SET_ALLOWED_NAVIGATION_DOMAINS = 'set_allowed_navigation_domains',
  GET_CREDENTIALS = 'get_credentials',
  SET_CREDENTIALS = 'set_credentials',
  DELETE_CREDENTIALS = 'delete_credentials',
  RUN_WEB_COMMANDS_PIPELINE = 'run_web_commands_pipeline',
  ENABLE_BLUETOOTH = 'enable_bluetooth',
  SCAN_BLE_DEVICES = 'scan_ble_devices',
  CONNECT_BLE_DEVICE = 'connect_ble_device',
  DISCONNECT_BLE_DEVICE = 'disconnect_ble_device',
  DISCOVER_BLE_GATT_SERVICES = 'discover_ble_gatt_services',
  READ_BLE_GATT_CHARACTERISTIC = 'read_ble_gatt_characteristic',
  READ_NFC_TAG = 'read_nfc_tag',
  WRITE_NFC_TAG = 'write_nfc_tag',
}

export enum STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum ERROR_CODES {
  NO_BRIDGE = 'no_bridge',
  SUBSCRIPTION_NOT_FOUND = 'subscription_not_found',
}

export interface InitialData {
  initiator: string
  meta?: object | string
}

export interface InitialDataEmail extends InitialData {
  initiator: 'email_link'
  meta: {
    email: string
  }
}

export interface InitialDataProfileAction extends InitialData {
  initiator: 'profile_action'
  meta: {
    action: string
    profile: {
      user_huid: string
      name: string
      avatar?: string
      avatar_preview?: string
      company?: string
      company_position?: string
      department?: string
      office?: string
      manager?: string
      manager_huid?: string
      email?: string
      description?: string
      other_phone?: string
      ip_phone?: string
      other_ip_phone?: string
    }
  }
}

export interface InitialDataPush extends InitialData {
  initiator: 'push_notification'
  meta?: object
}

export interface InitialDataDeeplink extends InitialData {
  initiator: 'deeplink'
  meta?: object
}

export type MentionDataType = {
  mentionType: 'user' | 'contact' | 'chat' | 'channel' | 'all'
  mentionId: string
  mentionData: {
    connType: 'cts' | 'rts' | 'hybrid'
    userHuid?: string
    name: string
    groupChatId?: string
  }
}

export interface InitialDataMenuAction extends InitialData {
  initiator: 'menu_action'
  meta: {
    action: string
    sender: {
      user_huid: string
      name: string
      avatar?: string
      avatar_preview?: string
      company?: string
      company_position?: string
      email?: string
    }
    message: {
      body: string
      timestamp: number
      mentions: Array<MentionDataType>
    }
    files?: File[]
  }
}

export type RuleDownload = {
  action: 'download'
  ruleMeta: {
    contentType: string | null
    fileSize: number | null
    fileExt: Array<string> | null
  }
}

export type RuleUpload = {
  action: 'upload'
  ruleMeta: {
    contentType: string | null
    fileSize: number | null
    fileExt: Array<string> | null
  }
}

export type RuleShare = {
  action: 'share'
  ruleMeta: {
    contentType: string | null
    fileSize: number | null
    fileExt: Array<string> | null
  }
}

export type RuleCopy = {
  action: 'copy'
  ruleMeta: {}
}

export type ReadyEventResponse =
  | {
      ref: string
      status: STATUS.SUCCESS
      payload: {
        logsEnabled?: boolean
        isMain?: boolean
        type: string
        openSmartAppMeta?: object
        initialData?:
          | InitialDataEmail
          | InitialDataProfileAction
          | InitialDataPush
          | InitialDataDeeplink
          | InitialDataMenuAction
        rules?: Array<RuleDownload | RuleUpload | RuleShare | RuleCopy>
      }
    }
  | undefined

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
    errorCode?: string | null
  }
}
