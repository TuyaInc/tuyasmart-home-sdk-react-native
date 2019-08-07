const HomeNativeApi = require('react-native').NativeModules.TuyaHomeModule
import { TYNativeBridge, HOMEDEVICESTATUS,HOMESTATUS,WARNMESSAGEARRIVED } from './bridgeUtils'

const TuyaHomeApi = {
  getHomeDetail (params) {
    return HomeNativeApi.getHomeDetail(params)
  },

  getHomeLocalCache (params) {
    return HomeNativeApi.getHomeLocalCache(params)
  },

  updateHome (params) {
    return HomeNativeApi.updateHome(params)
  },

  dismissHome (params) {
    return HomeNativeApi.dismissHome(params)
  },
  sortHome (params) {
    return HomeNativeApi.sortHome(params)
  },

  addRoom (params) {
    return HomeNativeApi.addRoom(params)
  },

  removeRoom (params) {
    return HomeNativeApi.removeRoom(params)
  },

  sortRoom (params) {
    return HomeNativeApi.sortRoom(params)
  },

  queryRoomList (params) {
    return HomeNativeApi.queryRoomList(params)
  },
  getHomeBean (params) {
    return HomeNativeApi.getHomeBean(params)
  },
  createGroup (params) {
    return HomeNativeApi.createGroup(params)
  },
  queryRoomInfoByDevice (params) {
    return HomeNativeApi.queryRoomInfoByDevice(params)
  },
  registerHomeDeviceStatusListener (
    params,
    onDeviceDpUpdate,
    onDeviceStatusChanged,
    onDeviceInfoUpdate,
  ) {
    HomeNativeApi.registerHomeDeviceStatusListener(params)
    return TYNativeBridge.on(
      TYNativeBridge.bridge(HOMEDEVICESTATUS, params.homeId),
      data => {
        if (data.type == 'onDeviceDpUpdate') {
          onDeviceDpUpdate(data)
        } else if (data.type == 'onDeviceStatusChanged') {
          onDeviceStatusChanged(data)
        } else if (data.type == 'onDeviceInfoUpdate') {
          onDeviceInfoUpdate(data)
        } 
      }
    )
  },
  unRegisterHomeDeviceStatusListener (params) {
     HomeNativeApi.unRegisterHomeDeviceStatusListener(params)
     TYNativeBridge.off(TYNativeBridge.bridge(HOMEDEVICESTATUS, params.homeId))
  },

  registerHomeStatusListener (
    params,
    onDeviceAdded,
    onDeviceRemoved,
    onGroupAdded,
    onGroupRemoved,
    onMeshAdded
  ) {
    HomeNativeApi.registerHomeStatusListener(params)
    return TYNativeBridge.on(
      TYNativeBridge.bridge(HOMESTATUS, params.homeId),
      data => {
        if (data.type == 'onDeviceAdded') {
          onDeviceAdded(data)
        } else if (data.type == 'onDeviceRemoved') {
          onDeviceRemoved(data)
        } else if (data.type == 'onGroupAdded') {
          onGroupAdded(data)
        } else if (data.type == 'onGroupRemoved') {
          onGroupRemoved(data)
        } else if (data.type == 'onMeshAdded') {
          onMeshAdded(data)
        } 
      }
    )
  },
  unRegisterHomeStatusListener (params) {
     HomeNativeApi.unRegisterHomeStatusListener(params)
     TYNativeBridge.off(TYNativeBridge.bridge(HOMESTATUS, params.homeId))
  },
  createBlueMesh (params) {
    return HomeNativeApi.createBlueMesh(params)
  },
  createSigMesh (params) {
    return HomeNativeApi.createSigMesh(params)
  },
  queryDeviceListToAddGroup (params) {
    return HomeNativeApi.queryDeviceListToAddGroup(params)
  },
  queryZigbeeDeviceListToAddGroup (params) {
    return HomeNativeApi.queryZigbeeDeviceListToAddGroup(params)
  },
  onDestroy (params) {
    HomeNativeApi.onDestroy(params)
  },
  createZigbeeGroup (params) {
    return HomeNativeApi.createZigbeeGroup(params)
  },
  queryRoomInfoByGroup (params) {
    return HomeNativeApi.queryRoomInfoByGroup(params)
  },
  bindNewConfigDevs (params) {
    return HomeNativeApi.bindNewConfigDevs(params)
  },

  registerProductWarnListener (
    params,
    onWarnMessageArrived,
  ) {
    HomeNativeApi.registerProductWarnListener(params)
    return TYNativeBridge.on(
      TYNativeBridge.bridge(WARNMESSAGEARRIVED, params.homeId),
      data => {
        onWarnMessageArrived(data)
      }
    )
  },
  unRegisterProductWarnListener (params) {
     HomeNativeApi.unRegisterProductWarnListener(params)
     TYNativeBridge.off(TYNativeBridge.bridge(WARNMESSAGEARRIVED, params.homeId))
  },
  sortDevInHome (params) {
    return HomeNativeApi.sortDevInHome(params)
  },
}

module.exports = TuyaHomeApi
