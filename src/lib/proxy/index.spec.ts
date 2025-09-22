import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ERROR_CODES, METHODS, STATUS } from '../../types'
import { WebCommandOpenUrl, WebCommandSearchElement } from '../../types/proxy'

describe('proxy', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('setWebResourceCookies', () => {
    it('success response', async () => {
      const response = { ref: 'proxy-cookies', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { setWebResourceCookies } = await import('./index')

      const cookies = [{ value: 'session=abc; Domain=example.com; Path=/' }]

      const result = await setWebResourceCookies(cookies)

      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.SET_WEB_RESOURCE_COOKIES,
        params: { cookies },
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { setWebResourceCookies } = await import('./index')
      await expect(setWebResourceCookies([{ value: 'k=v; Domain=example.com' }])).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('setAllowedNavigationDomains', () => {
    it('success response', async () => {
      const response = { ref: 'proxy-domains', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { setAllowedNavigationDomains } = await import('./index')

      const result = await setAllowedNavigationDomains(['example.com', 'internal.company'])

      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.SET_ALLOWED_NAVIGATION_DOMAINS,
        params: { domains: ['example.com', 'internal.company'] },
        timeout: 1000,
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { setAllowedNavigationDomains } = await import('./index')
      await expect(setAllowedNavigationDomains(['example.com'])).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('getCredentials', () => {
    it('success response', async () => {
      const response = {
        ref: 'proxy-get-credentials',
        payload: { status: STATUS.SUCCESS, credentials: [] },
      }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { getCredentials } = await import('./index')

      const result = await getCredentials()

      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.GET_CREDENTIALS,
        params: {},
        timeout: 10_000,
        hide_recv_event_data: true,
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { getCredentials } = await import('./index')
      await expect(getCredentials()).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('setCredentials', () => {
    it('success response', async () => {
      const response = { ref: 'proxy-set-credentials', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { setCredentials } = await import('./index')

      const result = await setCredentials({ login: 'user', password: 'pass', type: 'login_password' })

      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.SET_CREDENTIALS,
        params: { credentials: { login: 'user', password: 'pass', type: 'login_password' } },
        timeout: 10_000,
        hide_send_event_data: true,
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { setCredentials } = await import('./index')
      await expect(setCredentials({ login: 'u', password: 'p', type: 'login_password' })).rejects.toBe(
        ERROR_CODES.NO_BRIDGE,
      )
    })
  })

  describe('deleteCredentials', () => {
    it('success response', async () => {
      const response = { ref: 'proxy-delete-credentials', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { deleteCredentials } = await import('./index')

      const result = await deleteCredentials()

      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.DELETE_CREDENTIALS,
        params: {},
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { deleteCredentials } = await import('./index')
      await expect(deleteCredentials()).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('runWebCommandsPipeline', () => {
    it('success response', async () => {
      const response = { ref: 'proxy-run-pipeline', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { runWebCommandsPipeline } = await import('./index')

      const pipeline = [
        {
          commands: [
            { type: 'open_url', value: 'https://example.com' } as WebCommandOpenUrl,
            { type: 'search_element', xpath: "//input[@name='q']" } as WebCommandSearchElement,
          ],
          interval: 100,
          retryCount: 1,
          onSuccess: [],
          onError: [],
        },
      ]

      const result = await runWebCommandsPipeline(pipeline)

      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.RUN_WEB_COMMANDS_PIPELINE,
        params: { pipeline },
        timeout: 1000,
        hide_send_event_data: true,
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { runWebCommandsPipeline } = await import('./index')
      await expect(runWebCommandsPipeline([])).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })
})


