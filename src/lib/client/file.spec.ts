import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ERROR_CODES, FILE_DOWNLOAD_ERROR_CODE, METHODS, STATUS } from '../../types'

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

  const fileDownloadStartFixture = {
    type: 'document',
    file: '/uploads/files/uuid1/report.pdf',
    fileMimeType: 'application/pdf',
    fileName: 'report.pdf',
    filePreview: null,
    filePreviewHeight: null,
    filePreviewWidth: null,
    fileSize: 10485760,
    fileHash: 'hash',
    fileEncryptionAlgo: 'stream',
    chunkSize: 2097152,
    fileId: 'uuid1',
    key: null,
  }

  describe('fileDownloadStart', () => {
    it('success response with load timeout and without progress subscription', async () => {
      const response = { ref: 'download-file', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      const onReceiveMock = vi.fn()

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock, onReceive: onReceiveMock },
      }))

      const { fileDownloadStart } = await import('./file')

      const result = await fileDownloadStart(fileDownloadStartFixture)

      // progress is not subscribed by the method itself, SmartApp does it with subscribeClientEvents
      expect(onReceiveMock).not.toHaveBeenCalled()
      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.FILE_DOWNLOAD_START,
        params: fileDownloadStartFixture,
        timeout: 60 * 60 * 1000,
      })
      expect(result).toBe(response)
    })

    it('fulfills with error status and error code on unsuccessful download', async () => {
      const errorResponse = {
        ref: 'download-file',
        payload: { status: STATUS.ERROR, errorCode: FILE_DOWNLOAD_ERROR_CODE.DOWNLOAD_FORBIDDEN },
      }
      const sendClientEventMock = vi.fn().mockResolvedValue(errorResponse)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { fileDownloadStart } = await import('./file')

      const result = await fileDownloadStart(fileDownloadStartFixture)

      expect(result).toBe(errorResponse)
      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { fileDownloadStart } = await import('./file')
      await expect(fileDownloadStart(fileDownloadStartFixture)).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('fileDownloadStop', () => {
    it('success response', async () => {
      const response = { ref: 'stop-download-file', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { fileDownloadStop } = await import('./file')

      const result = await fileDownloadStop({ fileId: 'uuid1' })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.FILE_DOWNLOAD_STOP,
        params: { fileId: 'uuid1' },
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { fileDownloadStop } = await import('./file')
      await expect(fileDownloadStop({ fileId: 'uuid1' })).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })
})


