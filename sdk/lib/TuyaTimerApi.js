const TimerNativeApi = require('react-native').NativeModules.TuyaTimerModule

const TuyaTimerApi = {
  addTimerWithTask (params) {
    return TimerNativeApi.addTimerWithTask(params)
  },
  getTimerTaskStatusWithDeviceId (params) {
    return TimerNativeApi.getTimerTaskStatusWithDeviceId(params)
  },
  updateTimerStatusWithTask (params) {
    return TimerNativeApi.updateTimerStatusWithTask(params)
  },
  removeTimerWithTask (params) {
    return TimerNativeApi.removeTimerWithTask(params)
  },
  updateTimerWithTask (params) {
    return TimerNativeApi.updateTimerWithTask(params)
  },
  updateTimerTaskStatusWithTask (params) {
    return TimerNativeApi.updateTimerTaskStatusWithTask(params)
  },
  updateTimerWithTaskAndInstruct (params) {
    return TimerNativeApi.updateTimerWithTaskAndInstruct(params)
  },
  getTimerWithTask (params) {
    return TimerNativeApi.getTimerWithTask(params)
  },
  getAllTimerWithDeviceId (params) {
    return TimerNativeApi.getAllTimerWithDeviceId(params)
  },
}
module.exports = TuyaTimerApi
