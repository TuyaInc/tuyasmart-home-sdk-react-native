import { NativeModules } from 'react-native';
// const CoreNativeApi = require('react-native').NativeModules.TuyaCoreModule
const CoreNativeApi = NativeModules.TuyaCoreModule;

const TuyaCoreApi = {
  // sync
  initApp(data) {
    if (data) {
      CoreNativeApi.initWithOptions(data);
    } else {
      CoreNativeApi.initWithoutOptions();
    }
  },

  // sync
  exitApp() {
    CoreNativeApi.exitApp();
  },

  // async, return a promise
  apiRequest(params: Object): Promise<any> {
    return CoreNativeApi.apiRequest(params);
  },
};
TuyaCoreApi.initWithOptions = function (data) {
  CoreNativeApi.initWithOptions(data);
};

// TuyaCoreApi.initApp(data) =function(data){
//   // sync
//   initApp (data) {
//     if(data){
//       CoreNativeApi.initWithOptions(data)
//     }else{
//       CoreNativeApi.initWithoutOptions()
//     }
//   },
// }

module.exports = TuyaCoreApi;
