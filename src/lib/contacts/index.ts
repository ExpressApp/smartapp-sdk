import bridge from "@expressms/smartapp-bridge"
import { METHODS } from '../../types'
import {RequestSelfProfileResponse, SendMessageMethodParams} from '../../types/contacts'

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

const openPersonalChat = ({ huid }: { huid: string }) => {
  return createPersonalChat({ huid })
}

const sendMessage = (
    {
      userHuid = null,
      groupChatId = null,
      messageBody = '',
      messageMeta = {},
    }: SendMessageMethodParams,
) => {
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

const openContactCard = ({ userHuid }: { userHuid: string }) => {
  if (!userHuid) return

  return bridge?.sendClientEvent({
    method: METHODS.OPEN_CONTACT_CARD,
    params: { userHuid }
  })
}

const requestSelfProfile = () : RequestSelfProfileResponse => {
  return bridge?.sendClientEvent({
    method: METHODS.REQUEST_SELF_PROFILE,
    params: {},
  }) as RequestSelfProfileResponse
}

export {
  addContact,
  getContact,
  createPersonalChat,
  sendMessage,
  openContactCard,
  requestSelfProfile,
  openPersonalChat,
}
