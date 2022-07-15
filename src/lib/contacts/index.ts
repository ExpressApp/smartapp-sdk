import bridge from '@unlimited/smartapp-bridge'
import { EVENT_TYPES } from '../../types'
import { SendMessage } from '../../types/contacts'

const addContact = async ({ phone, name }: { phone: string, name: string }) => {
  return bridge?.sendClientEvent({
    method: EVENT_TYPES.ADD_CONTACT,
    params: {
      phone,
      name,
    },
  })
}

const getContact = async ({ phone }: { phone: string }) => {
  return bridge?.sendClientEvent({
    method: EVENT_TYPES.GET_CONTACT,
    params: { phone },
  })
}

const createPersonalChat = async ({ huid }: { huid: string }) => {
  return bridge?.sendClientEvent({
    method: EVENT_TYPES.CREATE_PERSONAL_CHAT,
    params: { huid },
  })
}

const sendMessage = (
  { userHuid = null, groupChatId = null, messageBody = '', messageMeta = {} }: SendMessage
) => {
  return bridge?.sendClientEvent({
    method: EVENT_TYPES.SEND_MESSAGE,
    params: { userHuid, groupChatId, message: {
      body: messageBody,
      meta: messageMeta,
    }},
  })
}

export {
  addContact,
  getContact,
  createPersonalChat,
  sendMessage,
}
