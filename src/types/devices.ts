import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter'
import { STATUS, StatusResponse } from './bridge'

export type BluetoothErrorCode =
  | 'permission_denied'
  | 'bluetooth_not_found'
  | 'ble_device_not_found'
  | 'ble_device_not_connected'
  | 'ble_gatt_service_not_found'
  | 'ble_gatt_characteristic_not_found'
  | 'io_error'
  | 'error'

export type BleDevice = {
  address: string
  name: string
}

export type BleGattCharacteristic = {
  uuid: string
}

export type BleGattService = {
  uuid: string
  characteristics: Array<BleGattCharacteristic>
}

export interface BluetoothStatusResponse extends StatusResponse {
  payload: {
    status: STATUS
    errorCode?: BluetoothErrorCode
  }
}

export interface BluetoothScanBleDevicesResponse extends EmitterEventPayload {
  payload: {
    status: STATUS
    errorCode?: BluetoothErrorCode
    bleDevices: Array<BleDevice>
  }
}

export interface BluetoothDiscoverGattServicesResponse extends EmitterEventPayload {
  payload: {
    status: STATUS
    errorCode?: BluetoothErrorCode
    gattServices: Array<BleGattService>
  }
}

export interface BluetoothBleDeviceFoundEvent extends EmitterEventPayload {
  payload: {
    status: STATUS
    bleDevice: BleDevice
  }
}

export interface BluetoothReadBleGattCharacteristicResponse extends EmitterEventPayload {
  payload: {
    status: STATUS
    errorCode?: BluetoothErrorCode
    value: Array<number>
  }
}


export type BleDeviceCallback = (device: BleDevice) => {}

export type NfcErrorCode =
  | 'permission_denied'
  | 'nfc_not_found'
  | 'nfc_write_error'
  | 'cancelled_by_user'
  | 'error'

export type NfcMessage = {
  bytes: Array<number>
}

export interface NfcReadTagResponse extends EmitterEventPayload {
  payload: {
    status: STATUS
    errorCode?: NfcErrorCode
    nfcTag: {
      id: string
      messages: Array<NfcMessage>
    }
  }
}
