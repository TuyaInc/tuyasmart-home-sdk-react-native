import  {TYNativeBridge, SEARCHDEVICE } from './bridgeUtils'

const HomeDataManagerNativeApi = require('react-native').NativeModules
  .TuyaHomeDataManagerModule


const TuyaHomeDataManagerApi = {
  getHomeRoomList (params) {
    return HomeDataManagerNativeApi.getHomeRoomList(params)
  },
  getHomeDeviceList (params) {
    return HomeDataManagerNativeApi.getHomeDeviceList(params)
  },
  getHomeGroupList (params) {
    return HomeDataManagerNativeApi.getHomeGroupList(params)
  },
  getGroupBean (params) {
    return HomeDataManagerNativeApi.getGroupBean(params)
  },
  getDeviceBean (params) {
    return HomeDataManagerNativeApi.getDeviceBean(params)
  },
  getGroupRoomBean (params) {
    return HomeDataManagerNativeApi.getGroupRoomBean(params)
  },
  getRoomBean (params) {
    return HomeDataManagerNativeApi.getRoomBean(params)
  },
  getDeviceRoomBean (params) {
    return HomeDataManagerNativeApi.getDeviceRoomBean(params)
  },
  getGroupDeviceList (params) {
    return HomeDataManagerNativeApi.getGroupDeviceList(params)
  },
  getMeshGroupList (params) {
    return HomeDataManagerNativeApi.getMeshGroupList(params)
  },
  getMeshDeviceList (params) {
    return HomeDataManagerNativeApi.getMeshDeviceList(params)
  },
  getRoomDeviceList (params) {
    return HomeDataManagerNativeApi.getRoomDeviceList(params)
  },
  getRoomGroupList (params) {
    return HomeDataManagerNativeApi.getRoomGroupList(params)
  },
  getHomeBean (params) {
    return HomeDataManagerNativeApi.getHomeBean(params)
  },
  getSubDeviceBean (params) {
    return HomeDataManagerNativeApi.getSubDeviceBean(params)
  },
  getSubDeviceBeanByNodeId (params) {
    return HomeDataManagerNativeApi.getSubDeviceBeanByNodeId(params)
  },
  getProductBean (params) {
    return HomeDataManagerNativeApi.getProductBean(params)
  },
  getDp (params) {
    return HomeDataManagerNativeApi.getDp(params)
  },
  getDps (params) {
    return HomeDataManagerNativeApi.getDps(params)
  },
  getSchema (params) {
    return HomeDataManagerNativeApi.getSchema(params)
  },
  queryDev (params) {
    return HomeDataManagerNativeApi.queryDev(params)
  },
  discoveredLanDevice (
    onDeviceFind,
  ) {
    HomeDataManagerNativeApi.discoveredLanDevice()
    return TYNativeBridge.on(TYNativeBridge.bridge(SEARCHDEVICE, ''), data => {
      onDeviceFind(data)
    })
  },
  unRegisterDiscoveredLanDeviceListener(sub){
    HomeDataManagerNativeApi.unRegisterDiscoveredLanDeviceListener()
    TYNativeBridge.off(TYNativeBridge.bridge(SEARCHDEVICE,""), sub)
  },
  querySubDev (params) {
    return HomeDataManagerNativeApi.querySubDev(params)
  },
  getDevRespBean (params) {
    return HomeDataManagerNativeApi.getDevRespBean(params)
  },
  getSubDevRespBean (params) {
    return HomeDataManagerNativeApi.getSubDevRespBean(params)
  },
  getDevRespBeanList () {
    return HomeDataManagerNativeApi.getDevRespBeanList()
  },
  addDevRespList (params) {
     HomeDataManagerNativeApi.addDevRespList(params)
  },
  addProductList (params) {
     HomeDataManagerNativeApi.addProductList(params)
  },
  getSubDevList (params) {
    return HomeDataManagerNativeApi.getSubDevList(params)
  }
}

module.exports = TuyaHomeDataManagerApi
