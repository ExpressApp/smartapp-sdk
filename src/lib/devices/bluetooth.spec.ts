import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ERROR_CODES, METHODS, STATUS } from '../../types'

describe('devices:bluetooth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('enable', () => {
    it('success response', async () => {
      const response = { ref: 'ble-enable', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)

      const onReceiveMock = vi.fn()

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock, onReceive: onReceiveMock },
      }))

      const { enable } = await import('./bluetooth')

      const result = await enable()

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.ENABLE_BLUETOOTH,
        params: {},
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { enable } = await import('./bluetooth')
      await expect(enable()).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('scanBleDevices', () => {
    it('success installs and removes callback', async () => {
      const response = { ref: 'ble-scan', payload: { status: STATUS.SUCCESS, bleDevices: [] } }
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

      const { scanBleDevices } = await import('./bluetooth')

      const deviceCallback = vi.fn()

      const resultPromise = scanBleDevices({ scanDuration: 1000, deviceCallback })

      // simulate device found
      receiveHandler?.({ type: 'ble_device_found', payload: { bleDevice: { address: 'A1' } } })
      expect(deviceCallback).toHaveBeenCalledWith({ address: 'A1' })

      const result = await resultPromise

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.SCAN_BLE_DEVICES,
        params: { scanDuration: 1000 },
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { scanBleDevices } = await import('./bluetooth')
      await expect(scanBleDevices({ scanDuration: 1000 })).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('connectBleDevice', () => {
    it('success response', async () => {
      const response = { ref: 'ble-connect', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      const onReceiveMock = vi.fn()

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock, onReceive: onReceiveMock },
      }))
      const { connectBleDevice } = await import('./bluetooth')

      const result = await connectBleDevice({ bleDeviceAddress: 'ADDR' })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.CONNECT_BLE_DEVICE,
        params: { bleDeviceAddress: 'ADDR' },
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { connectBleDevice } = await import('./bluetooth')
      await expect(connectBleDevice({ bleDeviceAddress: 'ADDR' })).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('disconnectBleDevice', () => {
    it('success response', async () => {
      const response = { ref: 'ble-disconnect', payload: { status: STATUS.SUCCESS } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      const onReceiveMock = vi.fn()

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock, onReceive: onReceiveMock },
      }))
      const { disconnectBleDevice } = await import('./bluetooth')

      const result = await disconnectBleDevice({ bleDeviceAddress: 'ADDR' })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.DISCONNECT_BLE_DEVICE,
        params: { bleDeviceAddress: 'ADDR' },
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { disconnectBleDevice } = await import('./bluetooth')
      await expect(disconnectBleDevice({ bleDeviceAddress: 'ADDR' })).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('discoverGattServices', () => {
    it('success response', async () => {
      const response = { ref: 'ble-gatt', payload: { status: STATUS.SUCCESS, gattServices: [] } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      const onReceiveMock = vi.fn()

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock, onReceive: onReceiveMock },
      }))
      const { discoverGattServices } = await import('./bluetooth')

      const result = await discoverGattServices({ bleDeviceAddress: 'ADDR' })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.DISCOVER_BLE_GATT_SERVICES,
        params: { bleDeviceAddress: 'ADDR' },
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { discoverGattServices } = await import('./bluetooth')
      await expect(discoverGattServices({ bleDeviceAddress: 'ADDR' })).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })

  describe('readBleGattCharacteristic', () => {
    it('success response', async () => {
      const response = { ref: 'ble-read', payload: { status: STATUS.SUCCESS, value: [1, 2, 3] } }
      const sendClientEventMock = vi.fn().mockResolvedValue(response)
      const onReceiveMock = vi.fn()

      vi.doMock('@expressms/smartapp-bridge', () => ({
        default: { sendClientEvent: sendClientEventMock, onReceive: onReceiveMock },
      }))
      const { readBleGattCharacteristic } = await import('./bluetooth')

      const result = await readBleGattCharacteristic({
        bleDeviceAddress: 'ADDR',
        gattServiceUuid: 'SERVICE',
        gattCharacteristicUuid: 'CHAR',
      })

      expect(sendClientEventMock).toHaveBeenCalledWith({
        method: METHODS.READ_BLE_GATT_CHARACTERISTIC,
        params: {
          bleDeviceAddress: 'ADDR',
          gattServiceUuid: 'SERVICE',
          gattCharacteristicUuid: 'CHAR',
        },
      })
      expect(result).toBe(response)
    })

    it('no bridge', async () => {
      vi.doMock('@expressms/smartapp-bridge', () => ({ default: undefined }))
      const { readBleGattCharacteristic } = await import('./bluetooth')
      await expect(
        readBleGattCharacteristic({
          bleDeviceAddress: 'ADDR',
          gattServiceUuid: 'SERVICE',
          gattCharacteristicUuid: 'CHAR',
        })
      ).rejects.toBe(ERROR_CODES.NO_BRIDGE)
    })
  })
})
