const FeedBackNativeApi = require('react-native').NativeModules
  .TuyaFeedBackModule

const TuyaFeedBackApi = {
  getFeedbackList () {
    return FeedBackNativeApi.getFeedbackList()
  },
  getFeedbackType () {
    return FeedBackNativeApi.getFeedbackType()
  },
  addFeedback (params) {
    return FeedBackNativeApi.addFeedback(params)
  },
  getMsgList (params) {
    return FeedBackNativeApi.getMsgList(params)
  },
  addMsg (params) {
    return FeedBackNativeApi.addMsg(params)
  }
}

module.exports = TuyaFeedBackApi
