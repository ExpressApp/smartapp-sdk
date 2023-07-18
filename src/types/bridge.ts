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
}

export type ReadyEventResponse = ({
  ref: string,
  status: "success",
  payload: {
    logsEnabled?: boolean,
    isMain?: boolean,
    type: string,
    openSmartAppMeta?: object,
  },
}) | undefined