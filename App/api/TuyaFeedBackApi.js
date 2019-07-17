const FeedBackNativeApi = require('react-native').NativeModules.TuyaFeedBackModule;

const TuyaFeedBackApi = {
  getFeedbackList() {
    return FeedBackNativeApi.getFeedbackList();
  },
  getFeedbackType() {
    return FeedBackNativeApi.getFeedbackType();
  },
  addFeedback(params) {
    return FeedBackNativeApi.addFeedback(params);
  },
  getFeedbackMsg(params) {
    return FeedBackNativeApi.getFeedbackMsg(params);
  },
  addMsg(params) {
    return FeedBackNativeApi.addMsg(params);
  },
};

module.exports = TuyaFeedBackApi;
