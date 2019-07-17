const MessageNativeApi = require('react-native').NativeModules.TuyaMessageModule;

const TuyaMessageApi = {
  getMessageList() {
    return MessageNativeApi.getMessageList();
  },

  deleteMessage(params) {
    return MessageNativeApi.deleteMessage(params);
  },

  getMessageMaxTime() {
    return MessageNativeApi.getMessageMaxTime();
  },
};

module.exports = TuyaMessageApi;
