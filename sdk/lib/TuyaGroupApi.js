const GroupNativeApi = require('react-native').NativeModules.TuyaGroupModule
import {TYNativeBridge,  GROUPLISTENER } from './bridgeUtils'
const TuyaGroupApi = {
  registerGroupListener (params, onDpUpdate, onGroupInfoUpdate, onGroupRemoved) {
    GroupNativeApi.registerGroupListener(params)
    return TYNativeBridge.on(
      TYNativeBridge.bridge(GROUPLISTENER, params.groupId),
      data => {
        if (data.type == 'onDpUpdate') {
          onDpUpdate(data)
        } else if (data.type == 'onGroupInfoUpdate') {
          onGroupInfoUpdate(data)
        } else if (data.type == 'onGroupRemoved') {
          onGroupRemoved(data)
        }
      }
    )
  },
  unregisterGroupListener (params, sub) {
    GroupNativeApi.unregisterGroupListener(params)
    TYNativeBridge.off(TYNativeBridge.bridge(GROUPLISTENER, params.groupId), sub)
  },
  renameGroup (params) {
    return GroupNativeApi.renameGroup(params)
  },
  dismissGroup (params) {
    return  GroupNativeApi.dismissGroup(params)
  },
  publishDps (params) {
    return  GroupNativeApi.publishDps(params)
  },
  publishDpsWithEnum (params) {
    return  GroupNativeApi.publishDpsWithEnum(params)
  },
  updateDeviceList (params) {
    return  GroupNativeApi.updateDeviceList(params)
  },
  addDevice (params) {
    return  GroupNativeApi.addDevice(params)
  },
  removeDevice (params) {
    return  GroupNativeApi.removeDevice(params)
  }
}

module.exports = TuyaGroupApi
