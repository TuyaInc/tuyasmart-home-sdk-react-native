const SinglerTransferNativeApi = require('react-native').NativeModules
  .TuyaSingleTransferModule
import  {TYNativeBridge, TRANSFERDATA,TRANSFER } from './bridgeUtils'

const TuyaSingleTransferApi = {
  startConnect () {
    SinglerTransferNativeApi.startConnect()
  },
  isOnline () {
    return SinglerTransferNativeApi.isOnline()
  },
  subscribeDevice (params) {
    SinglerTransferNativeApi.subscribeDevice(params)
  },
  unSubscribeDevice (params) {
    SinglerTransferNativeApi.unSubscribeDevice(params)
  },
  registerTransferDataListener (onSuccess,onError) {
    SinglerTransferNativeApi.registerTransferDataListener()
    return TYNativeBridge.on(
      TYNativeBridge.bridge(TRANSFERDATA, ''),
      data => {
        if (data.type == 'onSuccess') {
          onSuccess(data)
        } else if (data.type == 'onError') {
          onError(data)
        }
      }
    )
  },
  unRegisterTransferDataListener(){
    SinglerTransferNativeApi.unRegisterTransferDataListener()
    TYNativeBridge.off(TYNativeBridge.bridge(TRANSFERDATA, ''))
  },

  registerTransferCallback (onConnectSuccess,onConnectError) {
    SinglerTransferNativeApi.registerTransferCallback()
    return TYNativeBridge.on(
      TYNativeBridge.bridge(TRANSFER, ''),
      data => {
        if (data.type == 'onSuccess') {
          onConnectSuccess(data)
        } else if (data.type == 'onError') {
          onConnectError(data)
        }
      }
    )
  },
  unRegisterTransferCallback(){
    SinglerTransferNativeApi.unRegisterTransferCallback()
    TYNativeBridge.off(TYNativeBridge.bridge(TRANSFER, ''))
  },

  stopConnect () {
    SinglerTransferNativeApi.stopConnect()
  }
}

module.exports = TuyaSingleTransferApi
