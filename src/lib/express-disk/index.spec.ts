import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ERROR_CODES, METHODS, STATUS } from '../../types'

describe('express-disk:getAuthCode', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  it('no bridge', async () => {
    vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
    const { getAuthCode } = await import('./index')
    await expect(getAuthCode()).rejects.toBe(ERROR_CODES.NO_BRIDGE)
  })

  it('success response', async () => {
    const response = {
      ref: 'c4fbbacb-3981-423f-91b7-50648843773f',
      payload: {
        status: STATUS.SUCCESS,
        auth: {
          diskHost: 'https://disk.company.ru',
          code: 'code123',
          codeChallenge: null,
          codeChallengeMethod: 'S256',
          expiresIn: 3600,
        },
      },
    }

    const sendClientEventMock = vi.fn().mockResolvedValue(response)

    vi.doMock('@expressms/smartapp-bridge', () => ({
      default: { sendClientEvent: sendClientEventMock },
    }))

    const { getAuthCode } = await import('./index')

    const result = await getAuthCode()

    expect(sendClientEventMock).toHaveBeenCalledTimes(1)
    expect(sendClientEventMock).toHaveBeenCalledWith({
      method: METHODS.GET_EXPRESS_DISK_AUTH_CODE,
      params: {},
      hide_recv_event_data: true,
    })
    expect(result).toBe(response)
  })

  it('error response', async () => {
    const response = {
      ref: 'ref-error',
      payload: {
        status: STATUS.ERROR,
        errorCode: 'network_error',
        auth: {
          diskHost: 'https://disk.company.ru',
          code: '',
          codeChallenge: null,
          codeChallengeMethod: 'S256',
          expiresIn: 0,
        },
      },
    }

    const sendClientEventMock = vi.fn().mockResolvedValue(response)

    vi.doMock('@expressms/smartapp-bridge', () => ({
      default: { sendClientEvent: sendClientEventMock },
    }))

    const { getAuthCode } = await import('./index')

    const result = await getAuthCode()
    expect(result).toBe(response)
  })
})
