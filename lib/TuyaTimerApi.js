const TimerNativeApi = require('react-native').NativeModules.TuyaTimerModule

const TuyaTimerApi = {
  addTimerWithTask (params) {
    return TimerNativeApi.addTimerWithTask(params)
  },
  addTimerWithTaskDps (params) {
    return TimerNativeApi.addTimerWithTaskDps(params)
  },
  getTimerTaskStatusWithDeviceId (params) {
    return TimerNativeApi.getTimerTaskStatusWithDeviceId(params)
  },
  updateTimerTaskStatusWithTask (params) {
    return TimerNativeApi.updateTimerTaskStatusWithTask(params)
  },
  removeTimerWithTask (params) {
    return TimerNativeApi.removeTimerWithTask(params)
  },
  updateTimerWithTask (params) {
    return TimerNativeApi.updateTimerWithTask(params)
  },
  updateTimerStatusWithTask (params) {
    return TimerNativeApi.updateTimerStatusWithTask(params)
  },
  updateTimerWithTaskInstruct (params) {
    return TimerNativeApi.updateTimerWithTaskInstruct(params)
  },
  getTimerWithTask (params) {
    return TimerNativeApi.getTimerWithTask(params)
  },
  getAllTimerWithDeviceId (params) {
    return TimerNativeApi.getAllTimerWithDeviceId(params)
  },
}
module.exports = TuyaTimerApi
