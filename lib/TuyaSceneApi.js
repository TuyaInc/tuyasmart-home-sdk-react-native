const SceneNativeApi = require("react-native").NativeModules.TuyaSceneModule;

const TuyaSceneApi = {
  getSceneList(params) {
    return SceneNativeApi.getSceneList(params);
  },
  getConditionList(params) {
    return SceneNativeApi.getConditionList(params);
  },
  getConditionDevList(params) {
    return SceneNativeApi.getConditionDevList(params);
  },
  getDeviceConditionOperationList(params) {
    return SceneNativeApi.getDeviceConditionOperationList(params);
  },
  createScene(params) {
    return SceneNativeApi.createScene(params);
  },
  modifyScene(params){
    return SceneNativeApi.modifyScene(params);
  },
  createAutoScene(params){
    return SceneNativeApi.createAutoScene(params)
  },
  getCityListByCountryCode(params) {
    return SceneNativeApi.getCityListByCountryCode(params);
  },
  getCityByCityIndex(params) {
    return SceneNativeApi.getCityByCityIndex(params);
  },
  getCityByLatLng(params) {
    return SceneNativeApi.getCityByLatLng(params);
  },
  createDpTask(params) {
    return SceneNativeApi.createDpTask(params);
  },
  getTaskDevList(params) {
    return SceneNativeApi.getTaskDevList(params);
  },
  getDeviceTaskOperationList(params) {
    return SceneNativeApi.getDeviceTaskOperationList(params);
  },
  modifyWeatherScene(params) {
    return SceneNativeApi.modifyWeatherScene(params);
  },
  modifyTimerScene(params) {
    return SceneNativeApi.modifyTimerScene(params);
  },
  modifyDevCondition(params) {
    return SceneNativeApi.modifyDevCondition(params);
  },
  createWeatherCondition(params) {
    return SceneNativeApi.createWeatherCondition(params);
  },
  createDevCondition(params) {
    return SceneNativeApi.createDevCondition(params);
  },
  createTimerCondition(params) {
    return SceneNativeApi.createTimerCondition(params);
  },
  executeScene(params) {
    return SceneNativeApi.executeScene(params);
  },
  deleteScene(params) {
    return SceneNativeApi.deleteScene(params);
  },
  enableScene(params) {
    return SceneNativeApi.enableScene(params);
  },
  disableScene(params) {
    return SceneNativeApi.disableScene(params);
  },
  onDestroy(params) {
    SceneNativeApi.onDestroy(params);
  }
};

module.exports = TuyaSceneApi;
