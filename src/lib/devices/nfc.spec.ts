import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ERROR_CODES, METHODS, STATUS } from '../../types'

describe('devices:nfc', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('readTag', () => {
    it('success response', async () => {
      const response = { ref: 'nfc-read', payload: { status: STATUS.SUCCESS, nfcTag: { id: 'tag1' } } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { readTag } = await import('./nfc')

      const result = await readTag()

      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.READ_NFC_TAG,
        params: {},
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))

      const { readTag } = await import('./nfc')
      await expect(readTag()).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('writeTag', () => {
    it('success response', async () => {
      const response = { ref: 'nfc-write', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { writeTag } = await import('./nfc')

      const messages = [{ recordType: 'text', data: 'hello' } as unknown as unknown]

      const result = await writeTag(messages as unknown as [])

      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.WRITE_NFC_TAG,
        params: { messages },
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))

      const { writeTag } = await import('./nfc')
      await expect(writeTag([] as never)).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })
})
