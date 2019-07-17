import TYNativeBridge, { GROUPLISTENER } from './bridgeUtils';

const GroupNativeApi = require('react-native').NativeModules.TuyaGroupModule;

const TuyaGroupApi = {
  createGroup(params) {
    return GroupNativeApi.createGroup(params);
  },

  queryDeviceListToAddGroup(params) {
    return GroupNativeApi.queryDeviceListToAddGroup(params);
  },
  dismissGroup(params) {
    return GroupNativeApi.dismissGroup(params);
  },
  registerGroupListener(params, onDpUpdate, onGroupInfoUpdate, onGroupRemoved) {
    GroupNativeApi.registerGroupListener(params);
    return TYNativeBridge.on(TYNativeBridge.bridge(GROUPLISTENER, params.groupId), (data) => {
      if (data.type == 'onDpUpdate') {
        onDpUpdate(data);
      } else if (data.type == 'onGroupInfoUpdate') {
        onGroupInfoUpdate(data);
      } else if (data.type == 'onGroupRemoved') {
        onGroupRemoved(data);
      }
    });
  },
  unregisterGroupListener(params, sub) {
    GroupNativeApi.unregisterGroupListener(params);
    TYNativeBridge.off(TYNativeBridge.bridge(GROUPLISTENER, params.groupId), sub);
  },
  publishDps(params) {
    return GroupNativeApi.publishDps(params);
  },
  onDestroy(params) {
    GroupNativeApi.onDestroy(params);
  },
};

module.exports = TuyaGroupApi;
