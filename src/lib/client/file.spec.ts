import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ERROR_CODES, METHODS, STATUS } from '../../types'

describe('client:file', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('openFile', () => {
    it('success response', async () => {
      const response = { ref: 'open-file', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { openFile } = await import('./file')

      const file = {
        type: 'document',
        file: 'https://cts.company.ru/file_service/uuid1.pdf',
        fileMimeType: 'application/pdf',
        fileName: 'file.pdf',
        filePreview: null,
        filePreviewHeight: null,
        filePreviewWidth: null,
        fileSize: 123,
        fileHash: null,
        fileEncryptionAlgo: null,
        chunkSize: 2048000,
        fileId: 'uuid1',
        key: null,
      }

      const result = await openFile(file)

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.OPEN_FILE,
        params: file,
        timeout: 60 * 60 * 1000,
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { openFile } = await import('./file')
      // @ts-expect-error minimal object for runtime test
      await expect(openFile({})).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('uploadFile', () => {
    it('success response', async () => {
      const response = {
        ref: 'upload-file',
        payload: { status: STATUS.SUCCESS, record: { file: 'id', type: 'doc' } },
      }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { uploadFile } = await import('./file')

      const result = await uploadFile({ mimeType: 'image/png', maxSize: 1024 })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.UPLOAD_FILE,
        params: { type: 'image/png', maxSize: 1024 },
        timeout: 60 * 60 * 1000,
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { uploadFile } = await import('./file')
      await expect(uploadFile({ mimeType: 'image/png' })).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('uploadFiles', () => {
    it('success response', async () => {
      const response = {
        ref: 'upload-files',
        payload: { status: STATUS.SUCCESS, records: [] },
      }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { uploadFiles } = await import('./file')

      const result = await uploadFiles({ mimeType: 'image/*', maxSize: 2048, totalSize: 4096 })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.UPLOAD_FILES,
        params: { type: 'image/*', maxSize: 2048, totalSize: 4096 },
        timeout: 60 * 60 * 1000,
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { uploadFiles } = await import('./file')
      await expect(uploadFiles({ mimeType: 'image/*' })).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })
})


