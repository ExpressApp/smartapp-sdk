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

const openChat = ({ groupChatId }: { groupChatId: string }) => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_CHAT,
    params: { groupChatId },
  })
}

export {
  openClientSettings,
  getChats,
  searchCorporatePhonebook,
  openChat,
}
