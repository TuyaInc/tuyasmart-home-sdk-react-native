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
    return RoomNativeApi.moveDevGroupListFromRoom(params)
  },
  sortDevInRoom (params) {
    return RoomNativeApi.sortDevInRoom(params)
  },
}

module.exports = TuyaRoomApi
