import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ERROR_CODES, METHODS, STATUS, SubscriptionEventType, SubscriptionPayloadType } from '../../types'

describe('client:events', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('subscribeClientEvents', () => {
    it('subscribes successfully, installs listener and invokes callback on matching event', async () => {
      const response = { ref: 'subscribe', payload: { status: STATUS.SUCCESS } }

      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let receiveHandler: ((evt: any) => void) | undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onReceiveMock = vi.fn((handler: (evt: any) => void) => {
        receiveHandler = handler
      })

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock, onReceive: onReceiveMock },
      }))

      const { subscribeClientEvents } = await import('./events')

      const callback = vi.fn()
      const payload = { type: 'smartapp' as SubscriptionPayloadType, id: 'email-app' as const }

      const result = await subscribeClientEvents({
        eventType: SubscriptionEventType.UNREAD_COUNTER_CHANGE,
        payload,
        callback,
      })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.SUBSCRIBE_CLIENT_EVENTS,
        params: { event: SubscriptionEventType.UNREAD_COUNTER_CHANGE, ...payload },
      })
      expect(result).toBe(response)

      // simulate incoming matching event to ensure callback is invoked
      receiveHandler?.({
        type: SubscriptionEventType.UNREAD_COUNTER_CHANGE,
        payload: { source: payload },
      })
      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (expect as any).objectContaining({ type: SubscriptionEventType.UNREAD_COUNTER_CHANGE })
      )
    })

    it('does not subscribe via bridge twice for the same id; registers additional callback', async () => {
      const response = { ref: 'subscribe', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let receiveHandler: ((evt: any) => void) | undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onReceiveMock = vi.fn((handler: (evt: any) => void) => {
        receiveHandler = handler
      })

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock, onReceive: onReceiveMock },
      }))

      const { subscribeClientEvents } = await import('./events')

      const payload = { type: 'smartapp' as SubscriptionPayloadType, id: 'email-app' as const }
      const cb1 = vi.fn()
      const cb2 = vi.fn()

      await subscribeClientEvents({ eventType: SubscriptionEventType.APP_VISIBILITY, payload, callback: cb1 })
      await subscribeClientEvents({ eventType: SubscriptionEventType.APP_VISIBILITY, payload, callback: cb2 })

      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.SUBSCRIBE_CLIENT_EVENTS,
        params: { event: SubscriptionEventType.APP_VISIBILITY, ...payload },
      })

      // both callbacks should be invoked for the same source
      receiveHandler?.({ type: SubscriptionEventType.APP_VISIBILITY, payload: { source: payload } })
      expect(cb1).toHaveBeenCalledTimes(1)
      expect(cb2).toHaveBeenCalledTimes(1)
    })

    it('rejects with error payload when bridge is not available', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { subscribeClientEvents } = await import('./events')

      await expect(
        subscribeClientEvents({ eventType: SubscriptionEventType.IOS_SWIPE })
      ).rejects.toMatchObject({ payload: { status: STATUS.ERROR, errorCode: ERROR_CODES.NO_BRIDGE } })
    })
  })

  describe('unsubscribeClientEvents', () => {
    it('returns error when subscription is not found and does not send event', async () => {
      const sendClientEventMock = vi.fn()
      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock },
      }))

      const { unsubscribeClientEvents } = await import('./events')

      const payload = { type: 'smartapp' as SubscriptionPayloadType, id: 'missing' as const }
      const result = await unsubscribeClientEvents({
        eventType: SubscriptionEventType.SMARTAPP_LIST,
        payload,
        callback: vi.fn(),
      })

      expect(sendClientEventMock).not.toHaveBeenCalled()
      expect(result).toMatchObject({ payload: { status: STATUS.ERROR, errorCode: ERROR_CODES.SUBSCRIPTION_NOT_FOUND } })
    })

    it('removes one of multiple callbacks without sending unsubscribe to client', async () => {
      const response = { ref: 'sub', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      const onReceiveMock = vi.fn()

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock, onReceive: onReceiveMock },
      }))

      const { subscribeClientEvents, unsubscribeClientEvents } = await import('./events')

      const payload = { type: 'smartapp' as SubscriptionPayloadType, id: 'email-app' as const }
      const eventType = SubscriptionEventType.UNREAD_COUNTER_CHANGE
      const cb1 = vi.fn()
      const cb2 = vi.fn()

      await subscribeClientEvents({ eventType, payload, callback: cb1 })
      await subscribeClientEvents({ eventType, payload, callback: cb2 })

      const result = await unsubscribeClientEvents({ eventType, payload, callback: cb1 })
      expect(result).toMatchObject({ payload: { status: STATUS.SUCCESS } })
      // still one subscription left → no UNSUBSCRIBE sent, and second subscribe shouldn't call bridge
      expect(sendClientEventMock).toHaveBeenCalledTimes(1)
      expect(sendClientEventMock).not.toHaveBeenCalledWith(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (expect as any).objectContaining({ method: METHODS.UNSUBSCRIBE_CLIENT_EVENTS })
      )
    })

    it('sends UNSUBSCRIBE when the last subscription is removed', async () => {
      const subscribeResponse = { ref: 'sub', payload: { status: STATUS.SUCCESS } }
      const unsubscribeResponse = { ref: 'unsub', payload: { status: STATUS.SUCCESS } }

      const sendClientEventMock = vi
        .fn()
        .mockResolvedValueOnce(subscribeResponse)
        .mockResolvedValueOnce(unsubscribeResponse)
      const onReceiveMock = vi.fn()

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock, onReceive: onReceiveMock },
      }))

      const { subscribeClientEvents, unsubscribeClientEvents } = await import('./events')

      const payload = { type: 'smartapp' as SubscriptionPayloadType, id: 'email-app' as const }
      const eventType = SubscriptionEventType.LAYOUT_TYPE
      const cb = vi.fn()

      await subscribeClientEvents({ eventType, payload, callback: cb })
      const result = await unsubscribeClientEvents({ eventType, payload, callback: cb })

      expect(sendClientEventMock).toHaveBeenLastCalledWith({
        method: METHODS.UNSUBSCRIBE_CLIENT_EVENTS,
        params: { event: eventType, ...payload },
      })
      expect(result).toBe(unsubscribeResponse)
    })

    it('rejects with NO_BRIDGE when bridge is not available', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { unsubscribeClientEvents } = await import('./events')

      await expect(
        unsubscribeClientEvents({ eventType: SubscriptionEventType.IOS_SWIPE, callback: vi.fn() })
      ).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })
})


