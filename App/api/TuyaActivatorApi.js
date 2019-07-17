const ActivatorNativeApi = require('react-native').NativeModules.TuyaActivatorModule;

const TuyaActivatorApi = {
  initActivator(params) {
    // type : TY_AP, TY_EZ,TY_QR;
    return ActivatorNativeApi.initActivator(params);
  },
  newGwSubDevActivator(params) {
    ActivatorNativeApi.newGwSubDevActivator(params);
  },
  getCurrentWifi(success, error) {
    return ActivatorNativeApi.getCurrentWifi({}, success, error);
  },
  openNetworkSettings() {
    return ActivatorNativeApi.openNetworkSettings({});
  },
  stopConfig() {
    ActivatorNativeApi.stopConfig();
  },
  onDestory() {
    ActivatorNativeApi.onDestory();
  },
};

module.exports = TuyaActivatorApi;
