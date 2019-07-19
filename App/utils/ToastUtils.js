import Toast from 'react-native-root-toast'

export default class ToastUtils {
  static toast(msg, position) {
    const toast = Toast.show(`${msg}`, {
      duration: Toast.durations.LONG,
      position,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {},
      onShown: () => {},
      onHide: () => {},
      onHidden: () => {},
    })
    setTimeout(() => {
      Toast.hide(toast)
    }, 2000)
  }

  static toastCenter(msg) {
    this.toast(msg, Toast.positions.CENTER)
  }
}
