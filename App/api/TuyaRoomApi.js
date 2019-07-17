const RoomNativeApi = require('react-native').NativeModules.TuyaRoomModule;

const TuyaRoomApi = {
  updateRoom(params) {
    return RoomNativeApi.updateRoom(params);
  },
  addDevice(params) {
    return RoomNativeApi.addDevice(params);
  },
  removeDevice(params) {
    return RoomNativeApi.removeDevice(params);
  },
  removeGroup(params) {
    return RoomNativeApi.removeGroup(params);
  },
};

module.exports = TuyaRoomApi;
