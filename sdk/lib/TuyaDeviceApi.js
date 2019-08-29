import {
  Platform
} from 'react-native';
const DeviceNativeApi = require('react-native').NativeModules.TuyaDeviceModule

import { TYNativeBridge, DEVLISTENER, WARNMESSAGEARRIVED } from './bridgeUtils'

const TuyaDeviceApi = {
  removeDevice(params) {
    return DeviceNativeApi.removeDevice(params)
  },
  renameDevice(params) {
    return DeviceNativeApi.renameDevice(params)
  },
  publishDps(params) {
    return DeviceNativeApi.publishDps(params)
  },
  publishDpsWithEnum(params) {
    return DeviceNativeApi.publishDpsWithEnum(params)
  },
  registerDevListener(params, onDpUpdate, onRemoved, onStatusChanged, onNetworkStatusChanged, onDevInfoUpdate) {
    DeviceNativeApi.registerDevListener(params)
    return TYNativeBridge.on(
      TYNativeBridge.bridge(DEVLISTENER, params.devId),
      data => {
        // console.warn('----->data',data)
        if (data.type == 'onDpUpdate') {
          onDpUpdate(data)
        } else if (data.type == 'onRemoved') {
          onRemoved(data)
        } else if (data.type == 'onStatusChanged') {
          onStatusChanged(data)
        } else if (data.type == 'onNetworkStatusChanged') {
          onNetworkStatusChanged(data)
        } else if (data.type == 'onDevInfoUpdate') {
          onDevInfoUpdate(data)
        }
      }
    )
  },
  unRegisterDevListener(params, sub) {
    DeviceNativeApi.unRegisterDevListener(params)
    TYNativeBridge.off(TYNativeBridge.bridge(DEVLISTENER, params.devId), sub)
  },
  getDp(params) {
    return DeviceNativeApi.getDp(params)
  },
  getDpList(params) {
    return DeviceNativeApi.getDpList(params)
  },
  resetFactory(params) {
    return DeviceNativeApi.resetFactory(params)
  },
  getDeviceProperty(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return DeviceNativeApi.getDeviceProperty(params)
  },
  saveDeviceProperty(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return DeviceNativeApi.saveDeviceProperty(params)
  },
  getDataPointStat(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return DeviceNativeApi.getDataPointStat(params)
  },
  queryData(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return DeviceNativeApi.queryData(params)
  },

  onDestroy(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    DeviceNativeApi.onDestroy(params)
  },

  requestWifiSignal(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return DeviceNativeApi.requestWifiSignal(params)
  },
  getInitiativeQueryDpsInfoWithDpsArray(params) {
    return DeviceNativeApi.getInitiativeQueryDpsInfoWithDpsArray(params)
  },
  registerWarnMessageListener(params, onWarnMessageArrived, ) {
    DeviceNativeApi.registerWarnMessageListener(params)
    return TYNativeBridge.on(
      TYNativeBridge.bridge(WARNMESSAGEARRIVED, params.devId),
      data => {
        onWarnMessageArrived(data)
      }
    )
  },

}

module.exports = TuyaDeviceApi
