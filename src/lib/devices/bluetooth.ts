import bridge from '@expressms/smartapp-bridge'
import {
  BleDeviceCallback,
  BluetoothBleDeviceFoundEvent,
  BluetoothDiscoverGattServicesResponse,
  BluetoothReadBleGattCharacteristicResponse,
  BluetoothScanBleDevicesResponse,
  BluetoothStatusResponse,
  ERROR_CODES,
  METHODS,
} from '../../types'

const deviceCallbacks: Array<BleDeviceCallback> = []

/**
 * Install bridge event listener for founded devices during scan
 */
const installBridgeEventListener = () => {
  if (!bridge) return

  bridge.onReceive(event => {
    if (event.type !== 'ble_device_found') return

    const {
      payload: { bleDevice },
    } = event as BluetoothBleDeviceFoundEvent

    deviceCallbacks.map(cb => cb(bleDevice))
  })
}

/**
 * Add callback to list
 */
const addDeviceCallback = (callback?: BleDeviceCallback) => {
  if (callback) deviceCallbacks.push(callback)
}

/**
 * Remove callback from list
 */
const removeDeviceCallback = (callback?: BleDeviceCallback) => {
  if (!callback) return

  const index = deviceCallbacks.findIndex(cb => cb === callback)
  if (index !== -1) deviceCallbacks.splice(index, 1)
}

/**
 * Enable bluetooth
 * @returns Promise that'll be fullfilled on success, otherwise rejected with reason
 */
export const enable = (): Promise<BluetoothStatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.ENABLE_BLUETOOTH,
      params: {},
    })
    .then(event => event as BluetoothStatusResponse)
}

/**
 * Scan BLE devices nearby
 * @param scanDuration Duration to scan devices in milliseconds
 * @param deviceCallback Callback that triggered on device found
 * @returns Promise that'll be fullfilled with `payload.bleDevices` on success, otherwise rejected with reason
 */
export const scanBleDevices = ({
  scanDuration,
  deviceCallback,
}: {
  scanDuration: number
  deviceCallback?: BleDeviceCallback
}): Promise<BluetoothScanBleDevicesResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  addDeviceCallback(deviceCallback)

  return bridge
    .sendClientEvent({
      method: METHODS.SCAN_BLE_DEVICES,
      params: {
        scanDuration,
      },
    })
    .then(event => {
      removeDeviceCallback(deviceCallback)
      return event as BluetoothScanBleDevicesResponse
    })
    .catch(() => {
      removeDeviceCallback(deviceCallback)
      return Promise.reject()
    })
}

/**
 * Connect bluetooth BLE device
 * @param bleDeviceAddress Address of the BLE device
 * @returns Promise that'll be fullfilled on success, otherwise rejected with reason
 */
export const connectBleDevice = ({
  bleDeviceAddress,
}: {
  bleDeviceAddress: string
}): Promise<BluetoothStatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.CONNECT_BLE_DEVICE,
      params: {
        bleDeviceAddress,
      },
    })
    .then(event => event as BluetoothStatusResponse)
}

/**
 * Disonnect bluetooth BLE device
 * @param bleDeviceAddress Address of the BLE device
 * @returns Promise that'll be fullfilled on success, otherwise rejected with reason
 */
export const disconnectBleDevice = ({
  bleDeviceAddress,
}: {
  bleDeviceAddress: string
}): Promise<BluetoothStatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.DISCONNECT_BLE_DEVICE,
      params: {
        bleDeviceAddress,
      },
    })
    .then(event => event as BluetoothStatusResponse)
}

/**
 * Discover services and characteristics of the BLE device
 * @param bleDeviceAddress Address of the BLE device
 * @returns Promise that'll be fullfilled with `payload.gattServices` on success, otherwise rejected with reason
 */
export const discoverGattServices = ({
  bleDeviceAddress,
}: {
  bleDeviceAddress: string
}): Promise<BluetoothDiscoverGattServicesResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.DISCOVER_BLE_GATT_SERVICES,
      params: {
        bleDeviceAddress,
      },
    })
    .then(event => event as BluetoothDiscoverGattServicesResponse)
}

/**
 * Read BLE GATT characteristic
 * @param bleDeviceAddress Address of the BLE device
 * @param gattServiceUuid UUID of the GATT service
 * @param gattCharacteristicUuid UUID of the GATT characteristic
 * @returns Promise that'll be fullfilled with `payload.value` on success, otherwise rejected with reason
 */
export const readBleGattCharacteristic = ({
  bleDeviceAddress,
  gattServiceUuid,
  gattCharacteristicUuid,
}: {
  bleDeviceAddress: string,
  gattServiceUuid: string,
  gattCharacteristicUuid: string,
}): Promise<BluetoothReadBleGattCharacteristicResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.READ_BLE_GATT_CHARACTERISTIC,
      params: {
        bleDeviceAddress,
        gattServiceUuid,
        gattCharacteristicUuid,
      },
    })
    .then(event => event as BluetoothReadBleGattCharacteristicResponse)
}

// Init device event listener
installBridgeEventListener()
