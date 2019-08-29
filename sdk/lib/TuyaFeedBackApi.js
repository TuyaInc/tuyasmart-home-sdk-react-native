const FeedBackNativeApi = require('react-native').NativeModules
  .TuyaFeedBackModule
import {
  Platform
} from 'react-native';

const TuyaFeedBackApi = {
  getFeedbackList() {
    return FeedBackNativeApi.getFeedbackList()
  },
  getFeedbackType() {
    return FeedBackNativeApi.getFeedbackType()
  },
  addFeedback(params) {
    return FeedBackNativeApi.addFeedback(params)
  },
  getMsgList(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return FeedBackNativeApi.getMsgList(params)
  },
  addMsg(params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return FeedBackNativeApi.addMsg(params)
  }
}

module.exports = TuyaFeedBackApi
