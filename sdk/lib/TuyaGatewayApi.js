
import {
  Platform
} from 'react-native';
const GatewayNativeApi = require('react-native').NativeModules.TuyaGatewayModule
import {TYNativeBridge,  GATWAYLISTENER } from './bridgeUtils'

const TuyaGatewayApi = {
  publishDps (params) {
    return GatewayNativeApi.publishDps(params)
  },
  broadcastDps (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }

    return GatewayNativeApi.broadcastDps(params)
  },
  multicastDps (params) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    return GatewayNativeApi.multicastDps(params)
  },
  getSubDevList (params) {
    return GatewayNativeApi.getSubDevList(params)
  },
  registerSubDevListener (params,onSubDevDpUpdate,onSubDevRemoved,onSubDevAdded,onSubDevInfoUpdate,onSubDevStatusChanged) {
    if (Platform.OS == "ios") {
      return Promise.reject("ios not support")
    }
    
    GatewayNativeApi.registerSubDevListener(params)
    return TYNativeBridge.on(
      TYNativeBridge.bridge(GATWAYLISTENER, params.devId),
      data => {
        if (data.type == 'onSubDevDpUpdate') {
          onSubDevDpUpdate(data)
        } else if (data.type == 'onSubDevRemoved') {
          onSubDevRemoved(data)
        } else if (data.type == 'onSubDevAdded') {
          onSubDevAdded(data)
        }else if (data.type == 'onSubDevInfoUpdate') {
          onSubDevInfoUpdate(data)
        }else if (data.type == 'onSubDevStatusChanged') {
          onSubDevStatusChanged(data)
        }
      }
    )
  },
  unRegisterSubDevListener (params,sub) {
    GatewayNativeApi.unRegisterSubDevListener(params)
    TYNativeBridge.off(TYNativeBridge.bridge(GATWAYLISTENER, params.devId), sub)
  },
  onDestroy (params) {
    GatewayNativeApi.onDestroy(params)
  }
}

module.exports = TuyaGatewayApi
