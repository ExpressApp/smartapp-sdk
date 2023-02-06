import bridge from "@expressms/smartapp-bridge"
import { METHODS } from "../../types"
import { SendMessageMethodParams } from "../../types/contacts"

const addContact = (
  { phone, name }: { phone: string, name: string },
) => {
  return bridge?.sendClientEvent({
    method: METHODS.ADD_CONTACT,
    params: {
      phone,
      name,
    },
  })
}

const getContact = async ({ phone }: { phone: string }) => {
  return bridge?.sendClientEvent({
    method: METHODS.GET_CONTACT,
    params: { phone },
  })
}

const createPersonalChat = ({ huid }: { huid: string }) => {
  return bridge?.sendClientEvent({
    method: METHODS.CREATE_PERSONAL_CHAT,
    params: { huid },
  })
}

const sendMessage = (
  {
    userHuid = null,
    groupChatId = null,
    messageBody = "",
    messageMeta = {},
  }: SendMessageMethodParams) => {
  return bridge?.sendClientEvent({
    method: METHODS.SEND_MESSAGE,
    params: {
      userHuid,
      groupChatId,
      message: {
        body: messageBody,
        meta: messageMeta,
      },
    },
  })
}

export {
  addContact,
  getContact,
  createPersonalChat,
  sendMessage,
}
