const HomeMemberNativeApi = require('react-native').NativeModules.TuyaHomeMemberModule;

const TuyaHomeMemberApi = {
  addMember(params) {
    return HomeMemberNativeApi.addMember(params);
  },
  removeMember(params) {
    return HomeMemberNativeApi.removeMember(params);
  },
  updateMember(params) {
    return HomeMemberNativeApi.updateMember(params);
  },
  queryMemberList(params) {
    return HomeMemberNativeApi.queryMemberList(params);
  },
};

module.exports = TuyaHomeMemberApi;
