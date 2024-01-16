import bridge from '@expressms/smartapp-bridge'
import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter'
import { CreateDeeplinkResponse, ERROR_CODES, File, GetConnectionStatusResponse, METHODS } from '../../types'
export * from './events'

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

const openFile = (file: File) => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_FILE,
    params: file,
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

export {
  openFile,
  openClientSettings,
  getChats,
  searchCorporatePhonebook,
  openGroupChat,
  sendBotCommand,
  requestLocation,
  getConnectionStatus,
  createDeeplink,
  openChatMessage,
}
