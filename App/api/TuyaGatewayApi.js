import TYNativeBridge, { SUBDEVLISTENER } from './bridgeUtils';

const GatewayNativeApi = require('react-native').NativeModules.TuyaGatewayModule;

const TuyaGatewayApi = {
  publishDps(params) {
    return GatewayNativeApi.publishDps(params);
  },
  broadcastDps(params) {
    return GatewayNativeApi.broadcastDps(params);
  },
  multicastDps(params) {
    return GatewayNativeApi.multicastDps(params);
  },
  registerSubDevListener(
    params,
    onSubDevDpUpdate,
    onSubDevRemoved,
    onSubDevAdded,
    onSubDevInfoUpdate,
    onSubDevStatusChanged,
  ) {
    GatewayNativeApi.registerSubDevListener(params);
    return TYNativeBridge.on(TYNativeBridge.bridge(SUBDEVLISTENER, params.devId), (data) => {
      if (data.type == 'onSubDevDpUpdate') {
        onSubDevDpUpdate(data);
      } else if (data.type == 'onSubDevRemoved') {
        onSubDevRemoved(data);
      } else if (data.type == 'onSubDevAdded') {
        onSubDevAdded(data);
      } else if (data.type == 'onSubDevInfoUpdate') {
        onSubDevInfoUpdate(data);
      } else if (data.type == 'onSubDevStatusChanged') {
        onSubDevStatusChanged(data);
      }
    });
  },
  unRegisterSubDevListener(params, sub) {
    GatewayNativeApi.unRegisterSubDevListener(params);
    TYNativeBridge.off(TYNativeBridge.bridge(SUBDEVLISTENER, params.devId), sub);
  },
};

module.exports = TuyaGatewayApi;
