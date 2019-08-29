import {
  Platform
} from 'react-native';

const RoomNativeApi = require('react-native').NativeModules.TuyaRoomModule

const TuyaRoomApi = {
  updateRoom (params) {
    return RoomNativeApi.updateRoom(params)
  },
  addDevice (params) {
    return RoomNativeApi.addDevice(params)
  },
  addGroup (params) {
    return RoomNativeApi.addGroup(params)
  },
  removeDevice (params) {
    return RoomNativeApi.removeDevice(params)
  },
  removeGroup (params) {
    return RoomNativeApi.removeGroup(params)
  },
  moveDevGroupListFromRoom (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return RoomNativeApi.moveDevGroupListFromRoom(params)
  },
  sortDevInRoom (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return RoomNativeApi.sortDevInRoom(params)
  },
}

module.exports = TuyaRoomApi
