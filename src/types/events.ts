export enum SubscriptionEventType {
  CONNECTION_STATUS = 'connection_status',
  UNREAD_COUNTER_CHANGE = 'unread_counter_change',
  LAYOUT_TYPE = 'layout_type',
  APP_VISIBILITY = 'app_visibility',
  SMARTAPP_LIST = 'smartapp_list',
}

export type SubscriptionPayload = {
  type: 'user' | 'chat' | 'smartapp'
  id: string
}
