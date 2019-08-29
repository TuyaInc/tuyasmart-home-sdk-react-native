const OTANativeApi = require('react-native').NativeModules.TuyaOTAModule
import  {TYNativeBridge, OTALISTENER } from './bridgeUtils'
const TuyaOTAApi = {
  startOta (params) {
     OTANativeApi.startOta(params)
  },
  getOtaInfo (params) {
   return OTANativeApi.getOtaInfo(params)
 },
 setOtaListener (params,onSuccess,onFailure,onProgress) {
    OTANativeApi.setOtaListener(params)
    return TYNativeBridge.on(
      TYNativeBridge.bridge(OTALISTENER, params.devId),
      data => {
        if (data.type == 'onSuccess') {
          onSuccess(data)
        } else if (data.type == 'onFailure') {
          onFailure(data)
        } else if (data.type == 'onProgress') {
          onProgress(data)
        }
      }
    )
  },
  onDestroy (params) {
   OTANativeApi.onDestroy(params)
  },
}

module.exports = TuyaOTAApi
