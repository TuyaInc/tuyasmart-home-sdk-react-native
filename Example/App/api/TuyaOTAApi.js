import TYNativeBridge, { HARDWAREUPGRADELISTENER } from './bridgeUtils';

const OTANativeApi = require('react-native').NativeModules.TuyaOTAModule;

const TuyaOTAApi = {
  getOtaInfo(params) {
    return OTANativeApi.getOtaInfo(params);
  },
  startOta(params, onSuccess, onFailure, onProgress) {
    OTANativeApi.startOta(params);
    return TYNativeBridge.on(TYNativeBridge.bridge(HARDWAREUPGRADELISTENER, params.devId), (data) => {
      if (data.type == 'onSuccess') {
        onSuccess(data);
      } else if (data.type == 'onFailure') {
        onFailure(data);
      } else if (data.type == 'onProgress') {
        onProgress(data);
      }
    });
  },
  onDestory() {
    OTANativeApi.onDestory();
  },
};

module.exports = TuyaOTAApi;
