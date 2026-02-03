import bridge from '@expressms/smartapp-bridge'
import {
  ERROR_CODES,
  File,
  FILE_MEDIA_QUALITY,
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

export { openFile, uploadFile, uploadFiles }
