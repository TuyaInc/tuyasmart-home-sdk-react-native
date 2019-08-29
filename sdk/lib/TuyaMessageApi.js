const MessageNativeApi = require('react-native').NativeModules.TuyaMessageModule

const TuyaMessageApi = {
  getMessageList () {
    return MessageNativeApi.getMessageList()
  },
  getMessageListParams (params) {
    return MessageNativeApi.getMessageListParams(params)
  },
  getMessageListParamsWithTime (params) {
    return MessageNativeApi.getMessageListParamsWithTime(params)
  },
  getMessageListByMsgType (params) {
    return MessageNativeApi.getMessageListByMsgType(params)
  },
  getMessageListByMsgSrcId (params) {
    return MessageNativeApi.getMessageListByMsgSrcId(params)
  },
  getMessageMaxTime () {
    return MessageNativeApi.getMessageMaxTime()
  },
  deleteMessage (params) {
    return MessageNativeApi.deleteMessage(params)
  },
}

module.exports = TuyaMessageApi
