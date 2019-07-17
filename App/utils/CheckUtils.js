import {
  View, StyleSheet, Text, TouchableOpacity, Dimensions, Platform,
} from 'react-native';

export default class CheckUtils {
  static isPoneAvailable(poneInput) {
    // var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    // if (!myreg.test(poneInput)) {
    //     return false;
    // } else {
    //     return true;
    // }
    return true;
  }

  static isVaValidateCode(code) {
    if (code != null && code != 'underfined' && code != '' && code.length == 6) {
      return true;
    }
    return false;
  }

  static isPassWord(code) {
    if (code != null && code != 'underfined' && code != '' && code.length >= 6) {
      return true;
    }
    return false;
  }

  static registerIsEmail(str) {
    if (str.indexOf('@') != -1) {
      return true;
    }
    return false;
  }

  static isIphoneX() {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    return (
      Platform.OS === 'ios'
      && ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH)
        || (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))
    );
  }
}
