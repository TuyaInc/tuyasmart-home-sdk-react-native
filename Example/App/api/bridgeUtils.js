import {
  DeviceEventEmitter, Platform, NativeEventEmitter, NativeModules,
} from 'react-native';

export const GROUPLISTENER = 'groupListener';
const HARDWAREUPGRADELISTENER = 'hardwareUpgradeListener';
const DEVLISTENER = 'devListener';
const SUBDEVLISTENER = 'subDevListener';
const HOMESTATUS = 'homeStatus';
const HOMECHANGE = 'homeChange';
const SINGLETRANSFER = 'SingleTransfer';

const TYNativeBridge = {};

TYNativeBridge.on = (eventname, callback) => {
  if (Platform.OS == 'android') {
    console.log('----->rn event', eventname);
    DeviceEventEmitter.addListener(eventname, callback);
  } else if (NativeModules.TuyaRNEventEmitter != undefined) {
    if (this.DeviceEventEmitterios == undefined) {
      this.DeviceEventEmitterios = new NativeEventEmitter(NativeModules.TuyaRNEventEmitter);
    }
    return this.DeviceEventEmitterios.addListener(eventname, callback);
  }
};
TYNativeBridge.off = (eventname, sub) => {
  if (Platform.OS == 'android') {
    DeviceEventEmitter.removeListener(eventname);
  } else {
    sub && sub.remove();
  }
};
TYNativeBridge.bridge = (key, id) => `${key}//${id}`;

module.exports = TYNativeBridge;
