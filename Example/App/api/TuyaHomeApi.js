import TYNativeBridge, { HOMESTATUS } from './bridgeUtils';

const HomeNativeApi = require('react-native').NativeModules.TuyaHomeModule;

const TuyaHomeApi = {
  getHomeDetail(params) {
    return HomeNativeApi.getHomeDetail(params);
  },

  getHomeLocalCache(params) {
    return HomeNativeApi.getHomeLocalCache(params);
  },

  updateHome(params) {
    return HomeNativeApi.updateHome(params);
  },

  dismissHome(params) {
    return HomeNativeApi.dismissHome(params);
  },

  addRoom(params) {
    return HomeNativeApi.addRoom(params);
  },

  removeRoom(params) {
    return HomeNativeApi.removeRoom(params);
  },

  sortRoom(params) {
    return HomeNativeApi.sortRoom(params);
  },

  queryRoomList(params) {
    return HomeNativeApi.queryRoomList(params);
  },
  createGroup(params) {
    return HomeNativeApi.createGroup(params);
  },
  registerHomeStatusListener(params, onDeviceAdded, onDeviceRemoved, onGroupAdded, onGroupRemoved, onMeshAdded) {
    HomeNativeApi.registerHomeStatusListener(params);
    return TYNativeBridge.on(TYNativeBridge.bridge(HOMESTATUS, params.homeId), (data) => {
      if (data.type == 'onDeviceAdded') {
        onDeviceAdded(data);
      } else if (data.type == 'onDeviceRemoved') {
        onDeviceRemoved(data);
      } else if (data.type == 'onGroupAdded') {
        onGroupAdded(data);
      } else if (data.type == 'onGroupRemoved') {
        onGroupRemoved(data);
      } else if (data.type == 'onMeshAdded') {
        onMeshAdded(data);
      }
    });
  },
  unRegisterHomeStatusListener(params, sub) {
    HomeNativeApi.unRegisterHomeStatusListener(params);
    TYNativeBridge.off(TYNativeBridge.bridge(HOMESTATUS, params.homeId), sub);
  },
  queryDeviceListToAddGroup(params) {
    return HomeNativeApi.queryDeviceListToAddGroup(params);
  },
  onDestroy(params) {
    HomeNativeApi.onDestroy(params);
  },
};

module.exports = TuyaHomeApi;
