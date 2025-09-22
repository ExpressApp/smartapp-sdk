import { beforeEach, describe, expect, it, vi } from 'vitest'
import { METHODS } from '../../types'

describe('contacts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('addContact', () => {
    it('success', async () => {
      const response = { ref: 'add-contact', payload: {} }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: { sendClientEvent: sendClientEventMock } }))

      const { addContact } = await import('./index')
      const result = await addContact({ phone: '+123', name: 'Alice' })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.ADD_CONTACT,
        params: { phone: '+123', name: 'Alice' },
      })
      expect(result).toBe(response)
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { addContact } = await import('./index')
      const result = await addContact({ phone: '+123', name: 'Alice' })
      expect(result).toBeUndefined()
    })
  })

  describe('getContact', () => {
    it('success', async () => {
      const response = { ref: 'get-contact', payload: { contact: { phone: '+123' } } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: { sendClientEvent: sendClientEventMock } }))

      const { getContact } = await import('./index')
      const result = await getContact({ phone: '+123' })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.GET_CONTACT,
        params: { phone: '+123' },
      })
      expect(result).toBe(response)
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { getContact } = await import('./index')
      const result = await getContact({ phone: '+123' })
      expect(result).toBeUndefined()
    })
  })

  describe('createPersonalChat', () => {
    it('success', async () => {
      const response = { ref: 'create-chat', payload: {} }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: { sendClientEvent: sendClientEventMock } }))

      const { createPersonalChat } = await import('./index')
      const result = await createPersonalChat({ huid: 'H123' })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.CREATE_PERSONAL_CHAT,
        params: { huid: 'H123' },
      })
      expect(result).toBe(response)
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { createPersonalChat } = await import('./index')
      const result = await createPersonalChat({ huid: 'H123' })
      expect(result).toBeUndefined()
    })
  })

  describe('openPersonalChat', () => {
    it('delegates to createPersonalChat', async () => {
      const response = { ref: 'open-chat', payload: {} }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: { sendClientEvent: sendClientEventMock } }))

      const { openPersonalChat } = await import('./index')
      const result = await openPersonalChat({ huid: 'H123' })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.CREATE_PERSONAL_CHAT,
        params: { huid: 'H123' },
      })
      expect(result).toBe(response)
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { openPersonalChat } = await import('./index')
      const result = await openPersonalChat({ huid: 'H123' })
      expect(result).toBeUndefined()
    })
  })

  describe('sendMessage', () => {
    it('success', async () => {
      const response = { ref: 'send-message', payload: {} }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: { sendClientEvent: sendClientEventMock } }))

      const { sendMessage } = await import('./index')
      const result = await sendMessage({ userHuid: 'U1', groupChatId: null, messageBody: 'hi', messageMeta: { a: 1 } })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.SEND_MESSAGE,
        params: {
          userHuid: 'U1',
          groupChatId: null,
          message: { body: 'hi', meta: { a: 1 } },
        },
      })
      expect(result).toBe(response)
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { sendMessage } = await import('./index')
      const result = await sendMessage({ userHuid: 'U1', groupChatId: null, messageBody: 'hi', messageMeta: { a: 1 } })
      expect(result).toBeUndefined()
    })
  })

  describe('openContactCard', () => {
    it('success', async () => {
      const response = { ref: 'open-card', payload: {} }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: { sendClientEvent: sendClientEventMock } }))

      const { openContactCard } = await import('./index')
      const result = await openContactCard({ userHuid: 'U1' })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.OPEN_CONTACT_CARD,
        params: { userHuid: 'U1' },
      })
      expect(result).toBe(response)
    })

    it('no userHuid returns undefined and does not call bridge', async () => {
      const sendClientEventMock = vi.fn()
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: { sendClientEvent: sendClientEventMock } }))

      const { openContactCard } = await import('./index')
      const result = await openContactCard({ userHuid: '' as unknown as string })

      expect(sendClientEventMock).not.toHaveBeenCalled()
      expect(result).toBeUndefined()
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { openContactCard } = await import('./index')
      const result = await openContactCard({ userHuid: 'U1' })
      expect(result).toBeUndefined()
    })
  })

  describe('requestSelfProfile', () => {
    it('success', async () => {
      const response = { ref: 'self-profile', payload: { profile: { huid: 'me' } } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: { sendClientEvent: sendClientEventMock } }))

      const { requestSelfProfile } = await import('./index')
      const result = await requestSelfProfile()

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.REQUEST_SELF_PROFILE,
        params: {},
      })
      expect(result).toBe(response)
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { requestSelfProfile } = await import('./index')
      const result = await requestSelfProfile()
      expect(result).toBeUndefined()
    })
  })
})
