import { beforeEach, describe, expect, it, vi } from 'vitest'
import { METHODS } from '../../types'

describe('devices:gps', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('requestLocation', () => {
    it('success response', async () => {
      const response = { ref: 'gps-ref', payload: { coords: { lat: 1, lon: 2 } } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { requestLocation } = await import('./gps')

      const result = await requestLocation()

      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.REQUEST_LOCATION,
        params: {},
      })
      expect(result).toBe(response)
    })

    it('returns undefined when platform is unknown', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))

      const { requestLocation } = await import('./gps')

      const result = await requestLocation()
      expect(result).toBeUndefined()
    })
  })
})
