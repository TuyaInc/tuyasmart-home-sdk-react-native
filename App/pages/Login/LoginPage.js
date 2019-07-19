import React from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity, Dimensions,
} from 'react-native';
import { TuyaUserApi } from '../../../sdk'

import NavigationBar from '../../common/NavigationBar';
import CheckUtils from '../../utils/CheckUtils';
import TextButton from '../../component/TextButton';
import DeviceStorage from '../../utils/DeviceStorage';
import { resetAction } from '../../navigations/AppNavigator';
import BaseComponent from '../../component/BaseComponet'
import { userName, password, countryCode } from '../../constant'

const { width } = Dimensions.get('window');

export default class LoginPage extends BaseComponent {
  constructor(props) {
    super(props);
  }

  renderLeftButton() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.pop();
          }}
          style={{ padding: 5, marginLeft: 8 }}
        >
          <Image source={require('../../res/images/arrow_left.png')} style={{ width: 15, height: 20 }} />
        </TouchableOpacity>
      </View>
    );
  }

  _loginConfirm() {
    if (userName.indexOf('@') >= 0) {
      TuyaUserApi.loginWithEmail({
        email: userName,
        password,
        countryCode,
      })
        .then(() => {
          DeviceStorage.saveUserInfo(userName, password, countryCode).then(
            () => {
              this.props.navigation.dispatch(resetAction('HomePage'));
            },
          );
        })
        .catch((error) => {
          this.showToast(error.toString())
        });
    } else {
      const LoginEnable = CheckUtils.isPoneAvailable(userName) && CheckUtils.isPassWord(password);
      if (LoginEnable) {
        TuyaUserApi.loginWithPhonePassword({
          phoneNumber: userName,
          password,
          countryCode,
        })
          .then(() => {
            DeviceStorage.saveUserInfo(userName, password, countryCode).then(
              () => {
                this.props.navigation.dispatch(resetAction('HomePage'));
              },
            );
          })
          .catch((error) => {
            this.showToast(error.toString())
          });
      } else {
        this.showToast("Format error")
      }
    }
  }

  renderContent() {
    const disabled = !(userName.length > 5 && password.length > 5);
    return (
      <View style={styles.container}>
        <NavigationBar style={{ backgroundColor: '#FFFFFF' }} leftButton={this.renderLeftButton()} />
        <Text
          style={{
            fontSize: 34,
            color: '#22242C',
            fontWeight: 'bold',
            marginTop: 30,
            marginLeft: 30,
          }}
        >
          login
        </Text>
        <Text style={styles.textStyle}>{'Account: '}{userName}</Text>
        <Text style={styles.textStyle}>{'Passwrod: '}{password}</Text>
        <TextButton
          style={{ marginTop: 50 }}
          onPress={() => {
            this._loginConfirm();
          }}
          disabled={disabled}
          title="login"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },
  textStyle: {
    height: 40,
    marginTop: 20,
    borderColor: '#EAEAEA',
    borderBottomWidth: 1,
    width: width * 0.85,
    marginLeft: 30,
    marginRight: 30,
    color: 'black'
  },
});
