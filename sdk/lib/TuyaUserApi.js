
import {
  Platform
} from 'react-native';

const UserNativeApi = require('react-native').NativeModules.TuyaUserModule

const TuyaUserApi = {
  getUser () {
    return UserNativeApi.getUser()
  },
  isLogin () {
    return UserNativeApi.isLogin()
  },
  loginWithPhone (params) {
    return UserNativeApi.loginWithPhone(params)
  },
  loginWithEmail (params) {
    return UserNativeApi.loginWithEmail(params)
  },
  loginWithPhonePassword (params) {
    return UserNativeApi.loginWithPhonePassword(params)
  },
  getEmailValidateCode (params) {
    return UserNativeApi.getEmailValidateCode(params)
  },
  registerAccountWithPhone (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return UserNativeApi.registerAccountWithPhone(params)
  },
  resetEmailPassword (params) {
    return UserNativeApi.resetEmailPassword(params)
  },
  resetPhonePassword (params) {
    return UserNativeApi.resetPhonePassword(params)
  },
  logout () {
    return UserNativeApi.logout()
  },
  getValidateCode (params) {
    return UserNativeApi.getValidateCode(params)
  },
  getRegisterEmailValidateCode (params) {
    return UserNativeApi.getRegisterEmailValidateCode(params)
  },
  registerAccountWithEmail (params) {
    return UserNativeApi.registerAccountWithEmail(params)
  },
  registerAccountWithEmail (params) {
    return UserNativeApi.registerAccountWithEmail(params)
  },
  reRickName (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return UserNativeApi.reRickName(params)
  },
  loginByTwitter (params) {
    return UserNativeApi.loginByTwitter(params)
  },
  loginByQQ (params) {
    return UserNativeApi.loginByQQ(params)
  },
  loginByWechat (params) {
    return UserNativeApi.loginByWechat(params)
  },
  loginByFacebook (params) {
    return UserNativeApi.loginByFacebook(params)
  },
  checkPhoneCode (params) {
    return UserNativeApi.checkPhoneCode(params)
  },
  checkEmailPassword (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return UserNativeApi.checkEmailPassword(params)
  },
  loginWithUid (params) {
    return UserNativeApi.loginWithUid(params)
  },
  loginOrRegisterWithUid (params) {
    return UserNativeApi.loginOrRegisterWithUid(params)
  },
  loginOrRegisterWithUidAndCreateHome (params) {
    return UserNativeApi.loginOrRegisterWithUidAndCreateHome(params)
  },
  registerAccountWithUid (params) {
    return UserNativeApi.registerAccountWithUid(params)
  },
  saveUser (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return UserNativeApi.saveUser(params)
  },
  sendBindVerifyCode (params) {
    return UserNativeApi.sendBindVerifyCode(params)
  },
  bindMobile (params) {
    return UserNativeApi.bindMobile(params)
  },
  updateTimeZone (params) {
    return UserNativeApi.updateTimeZone(params)
  },
  setTempUnit (params) {
    return UserNativeApi.setTempUnit(params)
  },
  uploadUserAvatar (params) {
    return UserNativeApi.uploadUserAvatar(params)
  },
  checkVersionUpgrade () {
    return UserNativeApi.checkVersionUpgrade()
  },
  upgradeVersion () {
    return UserNativeApi.upgradeVersion()
  },
  removeUser () {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return UserNativeApi.removeUser()
  },
  cancelAccount () {
    return UserNativeApi.cancelAccount()
  },
  switchUserRegion (params) {
    return UserNativeApi.switchUserRegion(params)
  },
  sendVerifyCodeWithUserName (params) {
    return UserNativeApi.sendVerifyCodeWithUserName(params)
  },
  checkCodeWithUserName (params) {
    return UserNativeApi.checkCodeWithUserName(params)
  },
  registerWithUserName (params) {
    return UserNativeApi.registerWithUserName(params)
  },
  getRegionListWithCountryCode (params) {
    return UserNativeApi.getRegionListWithCountryCode(params)
  },
  onDestroy () {
     UserNativeApi.onDestroy()
  },
}

module.exports = TuyaUserApi
