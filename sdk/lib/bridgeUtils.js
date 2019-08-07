import {
  DeviceEventEmitter,
  Platform,
  NativeEventEmitter,
  NativeModules
} from 'react-native'

const GROUPLISTENER = 'groupListener'
const NEEDLOGIN = 'needLogin'

const OTALISTENER = 'otaListener'
const DEVLISTENER = 'devListener'
const GATWAYLISTENER = 'gatwayListener'
const HOMEDEVICESTATUS = 'homeDeviceStatus'
const HOMESTATUS = 'homeStatus'
const HOMECHANGE = 'homeChange'
const TRANSFERDATA = 'transferData'
const TRANSFER = 'transfer'
const WARNMESSAGEARRIVED = "WarnMessageArrived";
const SMARTUPDATE = "SmartUpdate";
const SEARCHDEVICE = "searchDevice";

const TYNativeBridge = {}

TYNativeBridge.on = (eventname, callback) => {
  if (Platform.OS == 'android') {
    DeviceEventEmitter.addListener(eventname, callback)
  } else {
    if (NativeModules['TuyaRNEventEmitter'] != undefined) {
      if (this.DeviceEventEmitterios == undefined) {
        this.DeviceEventEmitterios = new NativeEventEmitter(
          NativeModules['TuyaRNEventEmitter']
        )
      }
      return this.DeviceEventEmitterios.addListener(eventname, callback)
    }
  }
}
TYNativeBridge.off = (eventname, sub) => {
  if (Platform.OS == 'android') {
    DeviceEventEmitter.removeListener(eventname)
  } else {
    sub && sub.remove()
  }
}
TYNativeBridge.bridge = (key, id) => {
  return key + '//' + id
}

module.exports = {
  TYNativeBridge,
  GROUPLISTENER,
  OTALISTENER,
  DEVLISTENER,
  GATWAYLISTENER,
  HOMEDEVICESTATUS,
  HOMESTATUS,
  HOMECHANGE,
  TRANSFERDATA,
  TRANSFER,
  WARNMESSAGEARRIVED,
  SMARTUPDATE,
  SEARCHDEVICE,
  NEEDLOGIN
}
