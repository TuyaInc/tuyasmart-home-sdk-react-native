const ShareNativeApi = require('react-native').NativeModules.TuyaShareModule;

const TuyaShareApi = {
  addShareWithHomeId(params) {
    return ShareNativeApi.addShareWithHomeId(params);
  },
  addShareWithMemberId(params) {
    return ShareNativeApi.addShareWithMemberId(params);
  },
  disableDevShare(params) {
    return ShareNativeApi.disableDevShare(params);
  },
  queryUserShareList(params) {
    return ShareNativeApi.queryUserShareList(params);
  },
  queryShareReceivedUserList() {
    return ShareNativeApi.queryShareReceivedUserList();
  },
  queryDevShareUserList(params) {
    return ShareNativeApi.queryDevShareUserList(params);
  },
  queryShareDevFromInfo(params) {
    return ShareNativeApi.queryShareDevFromInfo(params);
  },
  getUserShareInfo(params) {
    return ShareNativeApi.getUserShareInfo(params);
  },
  getReceivedShareInfo(params) {
    return ShareNativeApi.getReceivedShareInfo(params);
  },
  removeUserShare(params) {
    return ShareNativeApi.removeUserShare(params);
  },
  removeReceivedUserShare(params) {
    return ShareNativeApi.removeReceivedUserShare(params);
  },
  removeReceivedDevShare(params) {
    return ShareNativeApi.removeReceivedDevShare(params);
  },
  renameShareNickname(params) {
    return ShareNativeApi.renameShareNickname(params);
  },
  renameReceivedShareNickname(params) {
    return ShareNativeApi.renameReceivedShareNickname(params);
  },
};
module.exports = TuyaShareApi;
