import bridge from "@expressms/smartapp-bridge"
import { METHODS } from '../../types'
import {RequestSelfProfileResponse, SendMessageMethodParams} from '../../types/contacts'

/**
 * Add a contact to local device phonebook.
 * @param params Object containing phone and name of the contact.
 * @returns A promise that resolves with the response, or undefined if bridge is not available.
 */
export const addContact = (
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

/**
 * Get a contact by phone number.
 * @param params Object containing the phone number of the contact.
 * @returns A promise that resolves with the response, or undefined if bridge is not available.
 */
export const getContact = async ({ phone }: { phone: string }) => {
  return bridge?.sendClientEvent({
    method: METHODS.GET_CONTACT,
    params: { phone },
  })
}

/**
 * Creates a personal chat with the specified HUID.
 * @param {Object} params
 * @param {string} params.huid - The HUID of the user to create a chat with.
 * @returns {Promise<any> | undefined} A promise that resolves with the result of the operation, or undefined if bridge is not available.
 */
export const createPersonalChat = ({ huid }: { huid: string }) => {
  return bridge?.sendClientEvent({
    method: METHODS.CREATE_PERSONAL_CHAT,
    params: { huid },
  })
}

/**
 * Opens a personal chat with the specified HUID.
 * @param {Object} params
 * @param {string} params.huid - The HUID of the user whose chat to open.
 * @returns {Promise<any> | undefined} A promise that resolves with the result of the operation, or undefined if bridge is not available.
 */
export const openPersonalChat = ({ huid }: { huid: string }) => {
  return createPersonalChat({ huid })
}

/**
 * Sends a message to a user or group chat.
 * @param {SendMessageMethodParams} params - The parameters for sending a message.
 * @param {string | null} [params.userHuid=null] - The HUID of the user to send the message to.
 * @param {string | null} [params.groupChatId=null] - The ID of the group chat to send the message to.
 * @param {string} [params.messageBody=''] - The body of the message.
 * @param {object} [params.messageMeta={}] - Additional metadata for the message.
 * @returns {Promise<any> | undefined} A promise that resolves with the result of the operation, or undefined if bridge is not available.
 */
export const sendMessage = (
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

/**
 * Opens the contact card for the specified user HUID.
 * @param {Object} params
 * @param {string} params.userHuid - The HUID of the user whose contact card to open.
 * @returns {Promise<any> | undefined} A promise that resolves with the result of the operation, or undefined if bridge is not available or userHuid is not provided.
 */
export const openContactCard = ({ userHuid }: { userHuid: string }) => {
  if (!userHuid) return

  return bridge?.sendClientEvent({
    method: METHODS.OPEN_CONTACT_CARD,
    params: { userHuid }
  })
}

/**
 * Requests the self profile of the current user.
 * @returns {RequestSelfProfileResponse} The response containing the self profile information.
 */
export const requestSelfProfile = () : RequestSelfProfileResponse => {
  return bridge?.sendClientEvent({
    method: METHODS.REQUEST_SELF_PROFILE,
    params: {},
  }) as RequestSelfProfileResponse
}
