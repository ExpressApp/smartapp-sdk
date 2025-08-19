import { beforeEach, describe, expect, it, vi } from 'vitest'
import { METHODS } from '../../types'

describe('notification:onNotification', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  it('subscribes and invokes handler on NOTIFICATION event', async () => {
    const response = { ref: 'notif', payload: { key1: 'value1' } }

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

    const handleNotification = vi.fn()
    const { onNotification } = await import('./index')

    await onNotification(handleNotification)

    expect(sendClientEventMock).toHaveBeenCalledWith({
      method: METHODS.NOTIFICATION,
      params: {},
    })

    receiveHandler?.({ type: METHODS.NOTIFICATION, payload: {} })
    expect(handleNotification).toHaveBeenCalledTimes(1)
    expect(handleNotification).toHaveBeenCalledWith(response)
  })

  it('does not invoke handler for other events', async () => {
    const response = { ref: 'notif', payload: { any: 'data' } }
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

    const handleNotification = vi.fn()
    const { onNotification } = await import('./index')

    await onNotification(handleNotification)

    receiveHandler?.({ type: 'another_event', payload: {} })
    expect(handleNotification).not.toHaveBeenCalled()
  })

  it('no bridge returns undefined and does not call handler', async () => {
    vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
    const handleNotification = vi.fn()
    const { onNotification } = await import('./index')

    const result = await onNotification(handleNotification)
    expect(result).toBeUndefined()
    expect(handleNotification).not.toHaveBeenCalled()
  })
})


