import bridge from '@expressms/smartapp-bridge'
import {
  ERROR_CODES,
  File,
  FILE_MEDIA_QUALITY,
  FileDownloadTypeResponse,
  METHODS,
  StatusResponse,
  UploadFilesTypeResponse,
  UploadFileTypeResponse,
} from '../../types'

const FILE_LOAD_TIMEOUT = 60 * 60 * 1000

/**
 * Download and open single file with client
 * @param file File data to be opened
 * @returns Promise that'll be fullfilled, otherwise rejected with reason
 */
const openFile = async (file: File): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  const response = await bridge.sendClientEvent({
    method: METHODS.OPEN_FILE,
    params: file,
    timeout: FILE_LOAD_TIMEOUT,
  })

  return response as StatusResponse
}

/**
 * Upload single file with client
 * @param mimeType Mime type of allowed files
 * @param maxSize Max file size in bytes
 * @param mediaQuality File media quality (For example: low mediaQuality - high compression ratio on client)
 * @returns Promise that'll be fullfilled with file metadata on success, otherwise rejected with reason
 */
const uploadFile = async ({
  mimeType,
  maxSize,
  mediaQuality,
}: {
  mimeType: string
  maxSize?: number
  mediaQuality?: FILE_MEDIA_QUALITY | null
}): Promise<UploadFileTypeResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  const response = await bridge.sendClientEvent({
    method: METHODS.UPLOAD_FILE,
    params: {
      type: mimeType,
      maxSize,
      mediaQuality,
    },
    timeout: FILE_LOAD_TIMEOUT,
  })

  return response as UploadFileTypeResponse
}

/**
 * Upload files list with client
 * @param mimeType Mime type of allowed files
 * @param maxSize Max file size in bytes
 * @param totalSize Total files size in bytes
 * @param mediaQuality File media quality (For example: low mediaQuality - high compression ratio on client)
 * @returns Promise that'll be fullfilled with files metadata on success, otherwise rejected with reason
 */
const uploadFiles = async ({
  mimeType,
  maxSize,
  totalSize,
  mediaQuality,
}: {
  mimeType: string
  maxSize?: number,
  totalSize?: number,
  mediaQuality?: FILE_MEDIA_QUALITY | null
}): Promise<UploadFilesTypeResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  const response = await bridge.sendClientEvent({
    method: METHODS.UPLOAD_FILES,
    params: {
      type: mimeType,
      maxSize,
      totalSize,
      mediaQuality,
    },
    timeout: FILE_LOAD_TIMEOUT,
  })

  return response as UploadFilesTypeResponse
}

/**
 * Download and save single file to the external storage (Downloads) in background.
 * Unlike `openFile` there is no file component, the file isn't opened after download
 * and the promise is fulfilled only when the download and the export to the storage are finished.
 * Download progress (in bytes) can be received with `subscribeClientEvents`
 * by `SubscriptionEventType.FILE_DOWNLOAD_PROGRESS`, events are distinguished by `fileId`.
 * @param file File data to be downloaded
 * @returns Promise that'll be fullfilled with success status on download completion,
 * otherwise fulfilled with error status and one of `errorCode`
 * (see `FILE_DOWNLOAD_ERROR_CODE`) or rejected with reason
 */
const fileDownloadStart = async (file: File): Promise<FileDownloadTypeResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  const response = await bridge.sendClientEvent({
    method: METHODS.FILE_DOWNLOAD_START,
    params: file,
    timeout: FILE_LOAD_TIMEOUT,
  })

  return response as FileDownloadTypeResponse
}

/**
 * Stop file download started by `fileDownloadStart`.
 * Download progress is not affected: unsubscribe from `file_download_progress` to stop receiving it.
 * @param fileId Identifier of the file which download should be stopped
 * @returns Promise that'll be fullfilled with success status on successful stop,
 * otherwise fulfilled with error status and `errorCode` (see `FILE_DOWNLOAD_ERROR_CODE`)
 * or rejected with reason
 */
const fileDownloadStop = async ({ fileId }: { fileId: string }): Promise<FileDownloadTypeResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  const response = await bridge.sendClientEvent({
    method: METHODS.FILE_DOWNLOAD_STOP,
    params: { fileId },
  })

  return response as FileDownloadTypeResponse
}

export { openFile, uploadFile, uploadFiles, fileDownloadStart, fileDownloadStop }
