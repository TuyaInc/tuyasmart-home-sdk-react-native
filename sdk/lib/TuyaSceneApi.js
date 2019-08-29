import {
  Platform
} from 'react-native';

const SceneNativeApi = require("react-native").NativeModules.TuyaSceneModule;
import  {TYNativeBridge, SMARTUPDATE } from './bridgeUtils'

const TuyaSceneApi = {
  getDeviceTaskOperationList(params) {
    return SceneNativeApi.getDeviceTaskOperationList(params);
  },
  getDeviceTaskOperationListByGroup(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return SceneNativeApi.getDeviceTaskOperationListByGroup(params);
  },
  getDeviceTaskFunctionList(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return SceneNativeApi.getDeviceTaskFunctionList(params);
  },
  getDeviceTaskFunctionListByGoup(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return SceneNativeApi.getDeviceTaskFunctionListByGoup(params);
  },
  getSceneList(params) {
    return SceneNativeApi.getSceneList(params);
  },

  getSceneDetail(params) {
    return SceneNativeApi.getSceneDetail(params);
  },
  createScene(params) {
    return SceneNativeApi.createScene(params);
  },
  createSceneWithStickyOnTop(params) {
    return SceneNativeApi.createSceneWithStickyOnTop(params)
  },
  createSceneWithStickyOnTopAndPreCondition(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return SceneNativeApi.createSceneWithStickyOnTopAndPreCondition(params);
  },
  getConditionDevList(params) {
    return SceneNativeApi.getConditionDevList(params);
  },
  getTaskDevList(params) {
    return SceneNativeApi.getTaskDevList(params);
  },
  getTaskDevAndGoupList(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return SceneNativeApi.getTaskDevAndGoupList(params);
  },
  getSceneConditionDevList(params) {

    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }

    return SceneNativeApi.getSceneConditionDevList(params);
  },
  getDeviceConditionOperationList(params) {
    return SceneNativeApi.getDeviceConditionOperationList(params);
  },
  getConditionList(params) {
    return SceneNativeApi.getConditionList(params);
  },
  getConditionListAll(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return SceneNativeApi.getConditionListAll(params);
  },
  getCityByLatLng(params) {
    return SceneNativeApi.getCityByLatLng(params);
  },
  getCityByCityIndex(params) {
    return SceneNativeApi.getCityByCityIndex(params);
  },
  getCityListByCountryCode(params) {
    return SceneNativeApi.getCityListByCountryCode(params).then(data=>{
      console.log(data)
      return data
    });
  },
  sortSceneList(params) {
    return SceneNativeApi.sortSceneList(params);
  },
  getScenePanelBoundList(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return SceneNativeApi.getScenePanelBoundList(params);
  },
  getAvailableBindSceneList(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return SceneNativeApi.getAvailableBindSceneList(params);
  },
  bindLocalScene(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return SceneNativeApi.bindLocalScene(params);
  },
  unbindLocalScene(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return SceneNativeApi.unbindLocalScene(params);
  },
  getSceneBgs() {
    return SceneNativeApi.getSceneBgs();
  },
  registerSmartUpdateListener (
    onSmartUpdateListener,
  ) {
    SceneNativeApi.registerSmartUpdateListener()
    return TYNativeBridge.on(
      TYNativeBridge.bridge(SMARTUPDATE, ''),
      data => {
        onSmartUpdateListener(data)
      }
    )
  },
  unRegisterSmartUpdateListener () {
    SceneNativeApi.unRegisterSmartUpdateListener()
     TYNativeBridge.off(TYNativeBridge.bridge(SMARTUPDATE, ''))
  },
  createDpTask(params) {
    return SceneNativeApi.createDpTask(params);
  },
  createSceneTask(params) {
    return SceneNativeApi.createSceneTask(params);
  },
  onDestroy() {
    SceneNativeApi.onDestroy();
  },
  executeScene(params) {
    return SceneNativeApi.executeScene(params);
  },
  
  deleteScene(params) {
    return SceneNativeApi.deleteScene(params);
  },
  modifyScene(params) {
    return SceneNativeApi.modifyScene(params);
  },
  disableScene(params) {
    return SceneNativeApi.disableScene(params);
  },
  enableScene(params) {
    return SceneNativeApi.enableScene(params);
  },
  onDestroyScene(params) {
     SceneNativeApi.onDestroyScene(params);
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
};

module.exports = TuyaSceneApi;
