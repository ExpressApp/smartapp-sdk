import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ERROR_CODES, METHODS, STATUS } from '../../types'

describe('client:storage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('clientStorageGet', () => {
    it('deserializes payload.value and hides recv event data', async () => {
      const response = {
        ref: 'get',
        payload: { status: STATUS.SUCCESS, value: JSON.stringify({ a: 1 }) },
      }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { clientStorageGet } = await import('./storage')
      const result = await clientStorageGet({ key: 'k' })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.CLIENT_STORAGE_GET,
        params: { key: 'k' },
        hide_recv_event_data: true,
      })
      expect(result.payload.value).toEqual({ a: 1 })
    })

    it('no bridge rejects', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { clientStorageGet } = await import('./storage')
      await expect(clientStorageGet({ key: 'k' })).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('clientStorageSet', () => {
    it('serializes value and hides send event data', async () => {
      const response = { ref: 'set', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { clientStorageSet } = await import('./storage')
      const value = { x: 2 }
      const result = await clientStorageSet({ key: 'k', value })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.CLIENT_STORAGE_SET,
        params: { key: 'k', value: JSON.stringify(value) },
        hide_send_event_data: true,
      })
      expect(result).toBe(response)
    })

    it('no bridge rejects', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { clientStorageSet } = await import('./storage')
      await expect(clientStorageSet({ key: 'k', value: { a: 1 } })).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('clientStorageRemove', () => {
    it('sends remove with key', async () => {
      const response = { ref: 'remove', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { clientStorageRemove } = await import('./storage')
      const result = await clientStorageRemove({ key: 'k' })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.CLIENT_STORAGE_REMOVE,
        params: { key: 'k' },
      })
      expect(result).toBe(response)
    })

    it('no bridge rejects', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { clientStorageRemove } = await import('./storage')
      await expect(clientStorageRemove({ key: 'k' })).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('clientStorageClear', () => {
    it('sends clear with empty params', async () => {
      const response = { ref: 'clear', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { clientStorageClear } = await import('./storage')
      const result = await clientStorageClear()

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.CLIENT_STORAGE_CLEAR,
        params: {},
      })
      expect(result).toBe(response)
    })

    it('no bridge rejects', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { clientStorageClear } = await import('./storage')
      await expect(clientStorageClear()).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })
})


