import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ERROR_CODES, LOCATION, METHODS, STATUS } from '../../types'

describe('routing', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('routingChanged', () => {
    it('sends ROOT when isRoot=true', async () => {
      const response = { ref: 'routing-changed', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { routingChanged } = await import('./index')

      const result = routingChanged(true)

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.ROUTING_CHANGED,
        params: { location: LOCATION.ROOT },
      })
      expect(result).toBeInstanceOf(Promise)
    })

    it('sends NESTED when isRoot=false', async () => {
      const response = { ref: 'routing-changed', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { routingChanged } = await import('./index')

      const result = routingChanged(false)

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.ROUTING_CHANGED,
        params: { location: LOCATION.NESTED },
      })
      expect(result).toBeInstanceOf(Promise)
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { routingChanged } = await import('./index')
      const result = routingChanged(true)
      expect(result).toBeUndefined()
    })
  })

  describe('onBackPressed', () => {
    it('invokes handler when BACK_PRESSED event received', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let receiveHandler: ((evt: any) => void) | undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onReceiveMock = vi.fn((handler: (evt: any) => void) => {
        receiveHandler = handler
      })

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { onReceive: onReceiveMock },
      }))

      const handleBackPressed = vi.fn()
      const { onBackPressed } = await import('./index')

      onBackPressed(handleBackPressed)

      receiveHandler?.({ type: METHODS.BACK_PRESSED })
      expect(handleBackPressed).toHaveBeenCalledTimes(1)

      receiveHandler?.({ type: 'another_event' })
      expect(handleBackPressed).toHaveBeenCalledTimes(1)
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { onBackPressed } = await import('./index')
      const result = onBackPressed(vi.fn())
      expect(result).toBeUndefined()
    })
  })

  describe('openSmartApp', () => {
    it('sends with appId only when meta is not provided', async () => {
      const sendClientEventMock = vi.fn()
      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { openSmartApp } = await import('./index')
      openSmartApp({ appId: 'app-1' })
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.OPEN_SMART_APP,
        params: { appId: 'app-1' },
      })
    })

    it('sends with appId and meta when provided', async () => {
      const sendClientEventMock = vi.fn()
      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { openSmartApp } = await import('./index')
      const meta = { x: 1 }
      openSmartApp({ appId: 'app-2', meta })
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.OPEN_SMART_APP,
        params: { appId: 'app-2', meta },
      })
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { openSmartApp } = await import('./index')
      const result = openSmartApp({ appId: 'x' })
      expect(result).toBeUndefined()
    })
  })

  describe('closeSmartApp', () => {
    it('sends close event', async () => {
      const sendClientEventMock = vi.fn()
      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { closeSmartApp } = await import('./index')
      closeSmartApp()
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.CLOSE_SMART_APP,
        params: {},
      })
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { closeSmartApp } = await import('./index')
      const result = closeSmartApp()
      expect(result).toBeUndefined()
    })
  })

  describe('onMoveToRoot', () => {
    it('invokes handler when MOVE_TO_ROOT event received', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let receiveHandler: ((evt: any) => void) | undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onReceiveMock = vi.fn((handler: (evt: any) => void) => {
        receiveHandler = handler
      })

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { onReceive: onReceiveMock },
      }))

      const handleMoveToRoot = vi.fn()
      const { onMoveToRoot } = await import('./index')

      onMoveToRoot(handleMoveToRoot)

      receiveHandler?.({ type: METHODS.MOVE_TO_ROOT })
      expect(handleMoveToRoot).toHaveBeenCalledTimes(1)

      receiveHandler?.({ type: 'another_event' })
      expect(handleMoveToRoot).toHaveBeenCalledTimes(1)
    })

    it('no bridge returns undefined', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { onMoveToRoot } = await import('./index')
      const result = onMoveToRoot(vi.fn())
      expect(result).toBeUndefined()
    })
  })

  describe('exitSmartAppToCatalog', () => {
    it('sends open smart app with empty appId', async () => {
      const sendClientEventMock = vi.fn()
      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { exitSmartAppToCatalog } = await import('./index')
      exitSmartAppToCatalog()
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.OPEN_SMART_APP,
        params: { appId: '' },
      })
    })

    it('no bridge rejects for iOS allowSwipeNavigation but returns undefined for exit (coverage check)', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { exitSmartAppToCatalog, iOS } = await import('./index')
      const result = exitSmartAppToCatalog()
      expect(result).toBeUndefined()
      await expect(iOS.allowSwipeNavigation(true)).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('iOS.allowSwipeNavigation', () => {
    it('sends allow swipe command', async () => {
      const response = { ref: 'allow-swipe', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { iOS } = await import('./index')
      const result = await iOS.allowSwipeNavigation(true)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.ALLOW_IOS_SWIPE_NAVIGATION,
        params: { allowed: true },
      })
      expect(result).toBe(response)
    })
  })
})
