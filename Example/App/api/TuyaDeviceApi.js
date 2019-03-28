import TYNativeBridge from './bridgeUtils';

const DeviceNativeApi = require('react-native').NativeModules.TuyaDeviceModule;

const DEVLISTENER = 'devListener';

const TuyaDeviceApi = {
  getDevice(params) {
    return DeviceNativeApi.getDevice(params);
  },
  registerDevListener(params, onDpUpdate, onRemoved, onStatusChanged, onNetworkStatusChanged, onDevInfoUpdate) {
    DeviceNativeApi.registerDevListener(params);
    return TYNativeBridge.on(TYNativeBridge.bridge(DEVLISTENER, params.devId), (data) => {
      // console.warn('----->data',data)
      if (data.type == 'onDpUpdate') {
        onDpUpdate(data);
      } else if (data.type == 'onRemoved') {
        onRemoved(data);
      } else if (data.type == 'onStatusChanged') {
        onStatusChanged(data);
      } else if (data.type == 'onNetworkStatusChanged') {
        onNetworkStatusChanged(data);
      } else if (data.type == 'onDevInfoUpdate') {
        onDevInfoUpdate(data);
      } else if (data.type == 'onFirmwareUpgradeSuccess') {
        // IOS  固件升级在devices当中
      } else if (data.type == 'onFirmwareUpgradeFailure') {
      } else if (data.type == 'onFirmwareUpgradeProgress') {
      }
    });
  },
  unRegisterDevListener(params, sub) {
    DeviceNativeApi.unRegisterDevListener(params);
    TYNativeBridge.off(TYNativeBridge.bridge(DEVLISTENER, params.devId), sub);
  },
  onDestroy(params) {
    DeviceNativeApi.onDestroy(params);
  },
  send(params) {
    return DeviceNativeApi.send(params);
  },
  getDp(params) {
    return DeviceNativeApi.getDp(params);
  },
  renameDevice(params) {
    return DeviceNativeApi.renameDevice(params);
  },
  getDataPointStat(params) {
    return DeviceNativeApi.getDataPointStat(params);
  },
  removeDevice(params) {
    return DeviceNativeApi.removeDevice(params);
  },
};

module.exports = TuyaDeviceApi;
