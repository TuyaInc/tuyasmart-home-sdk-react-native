const UserNativeApi = require('react-native').NativeModules.TuyaUserModule;

const TuyaUserApi = {
  checkVersionUpgrade(params) {
    return UserNativeApi.checkVersionUpgrade(params);
  },
  upgradeVersion(params) {
    return UserNativeApi.upgradeVersion(params);
  },

  getValidateCode(params) {
    return UserNativeApi.getValidateCode(params);
  },

  loginWithValidateCode(params) {
    return UserNativeApi.loginWithValidateCode(params);
  },

  registerWithPhone(params) {
    return UserNativeApi.registerAccountWithPhone(params);
  },
  loginWithPhonePassword(params) {
    return UserNativeApi.loginWithPhonePassword(params);
  },
  resetPhonePassword(params) {
    return UserNativeApi.resetPhonePassword(params);
  },
  getRegisterEmailValidateCode(params) {
    return UserNativeApi.getRegisterEmailValidateCode(params);
  },
  registerAccountWithEmail(params) {
    return UserNativeApi.registerAccountWithEmail(params);
  },
  loginWithEmail(params) {
    return UserNativeApi.loginWithEmail(params);
  },
  getEmailValidateCode(params) {
    return UserNativeApi.getEmailValidateCode(params);
  },
  resetEmailPassword(params) {
    return UserNativeApi.resetEmailPassword(params);
  },
  logout() {
    return UserNativeApi.logout();
  },
  cancelAccount() {
    return UserNativeApi.cancelAccount();
  },
  registerAccountWithUid(params) {
    return UserNativeApi.registerAccountWithUid(params);
  },
  loginWithUid(params) {
    return UserNativeApi.loginWithUid(params);
  },
  loginOrRegisterWithUid(params) {
    return UserNativeApi.loginOrRegisterWithUid(params);
  },
  loginByTwitter(params) {
    return UserNativeApi.loginByTwitter(params);
  },
  loginByQQ(params) {
    return UserNativeApi.loginByQQ(params);
  },
  loginByWechat(params) {
    return UserNativeApi.loginByWechat(params);
  },
  loginByFacebook(params) {
    return UserNativeApi.loginByFacebook(params);
  },
  getCurrentUser() {
    return UserNativeApi.getCurrentUser();
  },
  uploadUserAvatar(params) {
    return UserNativeApi.uploadUserAvatar(params);
  },
  setTempUnit(params) {
    return UserNativeApi.setTempUnit(params);
  },
};

module.exports = TuyaUserApi;
