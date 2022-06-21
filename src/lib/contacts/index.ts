import bridge from '@unlimited/smartapp-bridge'
import { EVENT_TYPES } from '../../types'

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

export {
  addContact,
  getContact,
  createPersonalChat,
}
