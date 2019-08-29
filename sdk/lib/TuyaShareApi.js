import {
  Platform
} from 'react-native';
const ShareNativeApi = require('react-native').NativeModules.TuyaShareModule

const TuyaShareApi = {
  enableDevShare (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return ShareNativeApi.enableDevShare(params)
  },
  disableDevShare (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return ShareNativeApi.disableDevShare(params)
  },
  removeReceivedDevShare (params) {
    return ShareNativeApi.removeReceivedDevShare(params)
  },
  addShareWithHomeId (params) {
    return ShareNativeApi.addShareWithHomeId(params)
  },
  queryDevShareUserList (params) {
    return ShareNativeApi.queryDevShareUserList(params)
  },
  addShare (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return ShareNativeApi.addShare(params)
  },
  addShareWithMemberId (params) {
    return ShareNativeApi.addShareWithMemberId(params)
  },
  getUserShareInfo (params) {
    return ShareNativeApi.getUserShareInfo(params)
  },
  getReceivedShareInfo (params) {
    return ShareNativeApi.getReceivedShareInfo(params)
  },
  queryUserShareList (params) {
    return ShareNativeApi.queryUserShareList(params).then(data=>{
      return data
    })
  },
  queryShareReceivedUserList () {
    return ShareNativeApi.queryShareReceivedUserList()
  },
  queryShareDevFromInfo (params) {
    return ShareNativeApi.queryShareDevFromInfo(params)
  },
  renameShareNickname (params) {
    return ShareNativeApi.renameShareNickname(params)
  },
  renameReceivedShareNickname (params) {
    return ShareNativeApi.renameReceivedShareNickname(params)
  },
  removeUserShare (params) {
    return ShareNativeApi.removeUserShare(params)
  },
  removeReceivedUserShare (params) {
    return ShareNativeApi.removeReceivedUserShare(params)
  },
  onDestroy () {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
   ShareNativeApi.onDestroy()
  },
  inviteShare (params) {
    return ShareNativeApi.inviteShare(params)
  },
  confirmShareInviteShare (params) {
    return ShareNativeApi.confirmShareInviteShare(params)
  },
}
module.exports = TuyaShareApi
