import { NativeModules } from 'react-native'
const CoreNativeApi = NativeModules.TuyaCoreModule
import { TYNativeBridge, NEEDLOGIN, } from './bridgeUtils'

const TuyaCoreApi = {
  onDestroy() {
    CoreNativeApi.onDestroy()
  },
  setDebugMode(params) {
    return CoreNativeApi.setDebugMode(params)
  },

  apiRequest(params) {
    return CoreNativeApi.apiRequest(params)
  },
  initWithOptions(params) {
    CoreNativeApi.initWithOptions(params)
  },
  initWithoutOptions() {
    CoreNativeApi.initWithOptions()
  },
  setOnNeedLoginListener(needLoginListener) {
    CoreNativeApi.setOnNeedLoginListener()
    TYNativeBridge.on(
      NEEDLOGIN,
      () => {
        needLoginListener()
      }
    )
  }
}



module.exports = TuyaCoreApi
