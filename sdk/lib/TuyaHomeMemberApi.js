import {
  Platform
} from 'react-native';
const MemberNativeApi = require('react-native').NativeModules
  .TuyaHomeMemberModule

const TuyaHomeMemberApi = {
  updateMember (params) {
    return MemberNativeApi.updateMember(params)
  },
  updateMemberWithBean (params) {

    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }

    return MemberNativeApi.updateMemberWithBean(params)
  },
  updateMemberRole (params) {

    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }

    return MemberNativeApi.updateMemberRole(params)
  },
  addMember (params) {
    return MemberNativeApi.addMember(params)
  },
  addMemberWithBean (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return MemberNativeApi.addMemberWithBean(params)
  },
  removeMember(params) {
    return MemberNativeApi.removeMember(params)
  },
  queryMemberList (params) {
    return MemberNativeApi.queryMemberList(params).then(data=>{
      if (Platform.OS == "ios") {
        const List = []
        data.forEach(item => {
          List.push({
            ...item,
            memberId:item.id,
          })
        })
        return List
      }
      return data
      
    })
  },
  getMemberDeviceList (params) {

    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }

    return MemberNativeApi.getMemberDeviceList(params)
  },
  addMemberAccount (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }

    return MemberNativeApi.addMemberAccount(params)
  },
  uploadMemberAvatar (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return MemberNativeApi.uploadMemberAvatar(params)
  },
  processInvitation (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return MemberNativeApi.processInvitation(params)
  },
}

module.exports = TuyaHomeMemberApi
