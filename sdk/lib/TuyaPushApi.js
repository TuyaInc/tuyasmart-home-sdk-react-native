const PushNativeApi = require('react-native').NativeModules.TuyaPushModule

const TuyaPushApi = {
  registerDevice (data) {
   return PushNativeApi.registerDevice(data)
  },
  registerMQPushListener () {
    return PushNativeApi.registerMQPushListener()
  },

  // sync
  onDestroy () {
    PushNativeApi.onDestroy()
  }
}

module.exports = TuyaPushApi
