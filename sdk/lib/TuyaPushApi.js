
import {
  Platform
} from 'react-native';
const PushNativeApi = require('react-native').NativeModules.TuyaPushModule

const TuyaPushApi = {
  registerDevice (data) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
   return PushNativeApi.registerDevice(data)
  },
  registerMQPushListener () {

    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }

    return PushNativeApi.registerMQPushListener()
  },

  // sync
  onDestroy () {
    PushNativeApi.onDestroy()
  }
}

module.exports = TuyaPushApi
