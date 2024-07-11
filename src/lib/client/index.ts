import bridge from '@expressms/smartapp-bridge'
import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter'
import {
  CreateDeeplinkResponse,
  ERROR_CODES,
  GetConnectionStatusResponse,
  GetLayoutTypeResponse,
  GetUnreadCounterResponse,
  METHODS,
  SearchLocalPhonebookResponse,
  StatusResponse,
  SubscriptionPayload,
} from '../../types'
export * from './events'
export * from './storage'

const openClientSettings = () => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_CLIENT_SETTINGS,
    params: {},
  })
}

const getChats = ({ filter = null }: { filter: string | null }) => {
  return bridge?.sendClientEvent({
    method: METHODS.GET_CHATS,
    params: { filter },
  })
}

const searchCorporatePhonebook = ({ filter = null }: { filter: string | null }) => {
  return bridge?.sendClientEvent({
    method: METHODS.SEARCH_CORPORATE_PHONEBOOK,
    params: { filter },
  })
}

const openGroupChat = ({ groupChatId }: { groupChatId: string }) => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_GROUP_CHAT,
    params: { groupChatId },
  })
}

const sendBotCommand = ({
  userHuid,
  body,
  data,
}: {
  userHuid: string
  body: string
  data: { command: string } | null
}) => {
  if (typeof data !== 'object') return

  return bridge?.sendClientEvent({
    method: METHODS.SEND_BOT_COMMAND,
    params: {
      userHuid,
      message: {
        body,
        data,
      },
    },
  })
}

const requestLocation = () => {
  return bridge?.sendClientEvent({
    method: METHODS.REQUEST_LOCATION,
    params: {},
  })
}

/**
 * Get client current connection status. It's based on client's WebSocket connection state.
 * @returns Promise that'll be fullfilled with status data on success, otherwise rejected with reason
 */
const getConnectionStatus = async (): Promise<GetConnectionStatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  const response = await bridge.sendClientEvent({
    method: METHODS.GET_CONNECTION_STATUS,
    params: {},
  })

  return response as GetConnectionStatusResponse
}

/**
 * Create deeplink URL to open SmartApp
 * @param appId ID of SmartApp
 * @param meta Array of params to be included in deeplink
 * @returns Promise that'll be fullfilled with deeplink data on success, otherwise rejected with reason
 */
const createDeeplink = async (
  appId: string,
  meta: Array<{ key: string; value: null | boolean | string | number }>
): Promise<CreateDeeplinkResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  const response = await bridge.sendClientEvent({
    method: METHODS.CREATE_DEEPLINK,
    params: { appId, meta },
  })

  return response as CreateDeeplinkResponse
}

/**
 * Open message in chat
 * @param groupChatId Chat identifier
 * @param syncId Message identifier
 * @returns Promise that'll be fullfilled with success response
 */
const openChatMessage = async ({
  groupChatId,
  syncId,
}: {
  groupChatId: string
  syncId: string
}): Promise<EmitterEventPayload> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return await bridge.sendClientEvent({
    method: METHODS.OPEN_CHAT_MESSAGE,
    params: { groupChatId, syncId },
  })
}

/**
 * Handle deeplink to join call/conference/chat/channel
 * @param link Deeplink URL
 * @returns Promise that'll be fullfilled with success response, otherwise rejected with reason
 */
const handleDeeplink = ({ link }: { link: string }): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.HANDLE_DEEPLINK,
      params: { link },
    })
    .then(event => event as StatusResponse)
}

/**
 * Search entries in local phonebook
 * @param filter Query string
 * @returns Promise that'll be fullfilled with `payload.localPhonebookEntries` on success, otherwise rejected with reason
 */
const searchLocalPhonebook = ({ filter = null }: { filter: string | null }): Promise<SearchLocalPhonebookResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.SEARCH_LOCAL_PHONEBOOK,
      params: { filter },
    })
    .then(event => event as SearchLocalPhonebookResponse)
}

/**
 * Get unread counter for chat/user/bot/smartapp.
 * @returns Promise that'll be fullfilled with counter data on success, otherwise rejected with reason
 */
const getUnreadCounter = async ({ type, id }: SubscriptionPayload): Promise<GetUnreadCounterResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  const response = await bridge.sendClientEvent({
    method: METHODS.GET_UNREAD_COUNTER,
    params: { type, id },
  })

  return response as GetUnreadCounterResponse
}

/**
 * Get window layout type "minimal" | "full" | "half".
 * @returns Promise that'll be fullfilled with layout data on success, otherwise rejected with reason
 */
const getLayoutType = async (): Promise<GetLayoutTypeResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  const response = await bridge.sendClientEvent({
    method: METHODS.GET_LAYOUT_TYPE,
    params: {},
  })

  return response as GetLayoutTypeResponse
}

export {
  openClientSettings,
  getChats,
  searchCorporatePhonebook,
  openGroupChat,
  sendBotCommand,
  requestLocation,
  getConnectionStatus,
  createDeeplink,
  openChatMessage,
  handleDeeplink,
  searchLocalPhonebook,
  getUnreadCounter,
  getLayoutType,
}
