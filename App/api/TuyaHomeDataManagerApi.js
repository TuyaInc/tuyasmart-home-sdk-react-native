const HomeDataManagerNativeApi = require('react-native').NativeModules.TuyaHomeDataManagerModule;

const TuyaHomeDataManagerApi = {
  getHomeRoomList() {
    return HomeDataManagerNativeApi.getHomeRoomList();
  },
  getHomeDeviceList(params) {
    return HomeDataManagerNativeApi.getHomeDeviceList(params);
  },
  getHomeGroupList(params) {
    return HomeDataManagerNativeApi.getHomeGroupList(params);
  },
  getGroupBean(params) {
    return HomeDataManagerNativeApi.getGroupBean(params);
  },
  getDeviceBean(params) {
    return HomeDataManagerNativeApi.getDeviceBean(params);
  },
  getGroupRoomBean(params) {
    return HomeDataManagerNativeApi.getGroupRoomBean(params);
  },
  getRoomBean(params) {
    return HomeDataManagerNativeApi.getRoomBean(params);
  },
  getDeviceRoomBean(params) {
    return HomeDataManagerNativeApi.getDeviceRoomBean(params);
  },
  getGroupDeviceList(params) {
    return HomeDataManagerNativeApi.getGroupDeviceList(params);
  },
  getMeshGroupList(params) {
    return HomeDataManagerNativeApi.getMeshGroupList(params);
  },
  getMeshDeviceList(params) {
    return HomeDataManagerNativeApi.getMeshDeviceList(params);
  },
  getRoomDeviceList(params) {
    return HomeDataManagerNativeApi.getRoomDeviceList(params);
  },
  getRoomGroupList(params) {
    return HomeDataManagerNativeApi.getRoomGroupList(params);
  },
  getHomeBean(params) {
    return HomeDataManagerNativeApi.getHomeBean(params);
  },
};

module.exports = TuyaHomeDataManagerApi;
