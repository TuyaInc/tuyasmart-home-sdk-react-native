import { Platform } from 'react-native';

const TimerNativeApi = require('react-native').NativeModules.TuyaTimerModule;

const TuyaTimerApi = {
  addTimerWithTask(params) {
    return TimerNativeApi.addTimerWithTask(params);
  },
  addTimerWithTaskDps(params) {
    return TimerNativeApi.addTimerWithTaskDps(params);
  },
  getTimerTaskStatusWithDeviceId(params) {
    return TimerNativeApi.getTimerTaskStatusWithDeviceId(params);
  },
  updateTimerTaskStatusWithTask(params) {
    return TimerNativeApi.updateTimerTaskStatusWithTask(params);
  },
  removeTimerWithTask(params) {
    return TimerNativeApi.removeTimerWithTask(params);
  },
  updateTimerWithTask(params) {
    return TimerNativeApi.updateTimerWithTask(params);
  },
  updateTimerStatusWithTask(params) {
    return TimerNativeApi.updateTimerStatusWithTask(params);
  },
  updateTimerWithTaskInstruct(params) {
    return TimerNativeApi.updateTimerWithTaskInstruct(params);
  },
  getTimerWithTask(params) {
    return TimerNativeApi.getTimerWithTask(params);
  },
  async getAllTimerWithDeviceId(params) {
    try {
      const d = await TimerNativeApi.getAllTimerWithDeviceId(params);
      let TimerMap = {};
      if (Platform.OS === 'ios') {
        TimerMap = d;
      } else {
        for (let i = 0; i < d.length; i++) {
          const name = d[i].timerTaskStatus.timerName;
          TimerMap[name] = d[i].timerList;
        }
      }
      return TimerMap;
    } catch (e) {
      return e;
    }
  },
};
module.exports = TuyaTimerApi;
