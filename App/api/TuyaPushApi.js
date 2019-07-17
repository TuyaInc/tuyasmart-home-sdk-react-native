const PushNativeApi = require('react-native').NativeModules.TuyaPushModule;

const TuyaPushApi = {
  registerDevice(data) {
    PushNativeApi.registerDevice(data);
  },

  // sync
  onDestroy() {
    PushNativeApi.onDestroy();
  },
};

module.exports = TuyaPushApi;
