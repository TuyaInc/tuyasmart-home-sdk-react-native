import {
  Platform,
  NativeAppEventEmitter,
  DeviceEventEmitter
} from 'react-native'

export const listener = Platform.OS === 'ios'
  ? NativeAppEventEmitter
  : DeviceEventEmitter


  