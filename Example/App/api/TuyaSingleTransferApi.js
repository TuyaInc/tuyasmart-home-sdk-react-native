import TYNativeBridge, { SINGLETRANSFER } from './bridgeUtils';

const SinglerTransferNativeApi = require('react-native').NativeModules.TuyaSingleTransferModule;

const TuyaSingleTransferApi = {
  startConnect() {
    SinglerTransferNativeApi.startConnect();
  },
  isOnline() {
    return SinglerTransferNativeApi.isOnline();
  },
  subscribeDevice(params, onSuccess, onError) {
    SinglerTransferNativeApi.subscribeDevice(params);
  },
  unSubscribeDevice(params) {
    SinglerTransferNativeApi.unSubscribeDevice(params);
  },
  registerTransferDataListener(params) {
    SinglerTransferNativeApi.registerTransferDataListener(params);
    return TYNativeBridge.on(TYNativeBridge.bridge(SINGLETRANSFER, params.devId), (data) => {
      if (data.type == 'onSuccess') {
        onSuccess(data);
      } else if (data.type == 'onError') {
        onError(data);
      }
    });
  },
  unRegisterTransferDataListener(params) {
    TYNativeBridge.off(TYNativeBridge.bridge(SINGLETRANSFER, params.devId), sub);
  },
  stopConnect() {
    SinglerTransferNativeApi.stopConnect();
  },
};

module.exports = TuyaSingleTransferApi;
