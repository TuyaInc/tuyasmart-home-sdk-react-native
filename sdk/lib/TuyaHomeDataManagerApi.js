import { TYNativeBridge, SEARCHDEVICE } from './bridgeUtils'
import {
  Platform
} from 'react-native';

const HomeDataManagerNativeApi = require('react-native').NativeModules
  .TuyaHomeDataManagerModule


const TuyaHomeDataManagerApi = {
  getHomeRoomList(params) {
    return HomeDataManagerNativeApi.getHomeRoomList(params).then(data => {
      if (Platform.OS == 'ios') {
        const List = []
        data.forEach(item => {
          List.push({
            ...item,
            roomId: item.id
          })
        })
        data=List
      }
      return data
    })
  },
  getHomeDeviceList(params) {
    return HomeDataManagerNativeApi.getHomeDeviceList(params)
  },
  getHomeGroupList(params) {
    return HomeDataManagerNativeApi.getHomeGroupList(params)
  },
  getGroupBean(params) {
    return HomeDataManagerNativeApi.getGroupBean(params)
  },
  getDeviceBean(params) {
    return HomeDataManagerNativeApi.getDeviceBean(params)
  },
  getGroupRoomBean(params) {
    return HomeDataManagerNativeApi.getGroupRoomBean(params)
  },
  getRoomBean(params) {
    return HomeDataManagerNativeApi.getRoomBean(params)
  },
  getDeviceRoomBean(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return HomeDataManagerNativeApi.getDeviceRoomBean(params)
  },
  getGroupDeviceList(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return HomeDataManagerNativeApi.getGroupDeviceList(params)
  },
  getMeshGroupList(params) {
    return HomeDataManagerNativeApi.getMeshGroupList(params)
  },
  getMeshDeviceList(params) {
    return HomeDataManagerNativeApi.getMeshDeviceList(params)
  },
  getRoomDeviceList(params) {
    return HomeDataManagerNativeApi.getRoomDeviceList(params)
  },
  getRoomGroupList(params) {
    return HomeDataManagerNativeApi.getRoomGroupList(params)
  },
  getHomeBean(params) {
    return HomeDataManagerNativeApi.getHomeBean(params)
  },
  getSubDeviceBean(params) {
    return HomeDataManagerNativeApi.getSubDeviceBean(params)
  },
  getSubDeviceBeanByNodeId(params) {
    return HomeDataManagerNativeApi.getSubDeviceBeanByNodeId(params)
  },
  getProductBean(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return HomeDataManagerNativeApi.getProductBean(params)
  },
  getDp(params) {
    return HomeDataManagerNativeApi.getDp(params)
  },
  getDps(params) {
    return HomeDataManagerNativeApi.getDps(params)
  },
  getSchema(params) {
    return HomeDataManagerNativeApi.getSchema(params)
  },
  queryDev(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return HomeDataManagerNativeApi.queryDev(params)
  },
  discoveredLanDevice(
    onDeviceFind,
  ) {
    HomeDataManagerNativeApi.discoveredLanDevice()
    return TYNativeBridge.on(TYNativeBridge.bridge(SEARCHDEVICE, ''), data => {
      onDeviceFind(data)
    })
  },
  unRegisterDiscoveredLanDeviceListener(sub) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    HomeDataManagerNativeApi.unRegisterDiscoveredLanDeviceListener()
    TYNativeBridge.off(TYNativeBridge.bridge(SEARCHDEVICE, ""), sub)
  },
  querySubDev(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return HomeDataManagerNativeApi.querySubDev(params)
  },
  getDevRespBean(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return HomeDataManagerNativeApi.getDevRespBean(params)
  },
  getSubDevRespBean(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return HomeDataManagerNativeApi.getSubDevRespBean(params)
  },
  getDevRespBeanList() {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return HomeDataManagerNativeApi.getDevRespBeanList()
  },
  addDevRespList(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    HomeDataManagerNativeApi.addDevRespList(params)
  },
  addProductList(params) {
    HomeDataManagerNativeApi.addProductList(params)
  },
  getSubDevList(params) {
    return HomeDataManagerNativeApi.getSubDevList(params)
  }
}

module.exports = TuyaHomeDataManagerApi
