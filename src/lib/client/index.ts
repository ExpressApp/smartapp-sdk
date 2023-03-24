import bridge from '@expressms/smartapp-bridge'
import { METHODS } from '../../types'

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

const sendBotCommand = (
  {
    userHuid,
    body,
    data
  }: {
    userHuid: string
    body: string
    data: { command: string } | null
  }
) => {
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

export {
  openClientSettings,
  getChats,
  searchCorporatePhonebook,
  sendBotCommand,
  openGroupChat,
}
