import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { TuyaUserApi } from '../../../sdk'

import HeadView from '../../common/HeadView'
import EditItem from '../../common/EditItem'
import ButtonX from '../../common/ButtonX'
import CheckUtils from '../../utils/CheckUtils';
import { resetAction } from '../../navigations/AppNavigator';
import BaseComponent from '../../common/BaseComponent'
import { userName, password, countryCode } from '../../constant'

export default class RegisterPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName,
      password,
      countryCode,
      code: ''
    };
  }

  componentWillUnmount() {
    TuyaUserApi.onDestroy()
  }
  getCode() {
    const { userName, countryCode } = this.state
    if (CheckUtils.registerIsEmail(userName)) {
      TuyaUserApi.getRegisterEmailValidateCode({
        countryCode,
        email: userName,
      })
        .then(() => {
          this.showToast('send Code success')
        }).catch(error => this.showToast(error.toString()))
    } else {
      TuyaUserApi.getValidateCode({
        countryCode,
        phoneNumber: userName,
      })
        .then(() => {
          this.showToast('send Code success')
        }).catch(error => this.showToast(error.toString()))
    }
  }

  register() {
    const { userName, countryCode, code, password } = this.state
    if (!code || !countryCode || !userName || !password) return
    let promise = ''
    if (CheckUtils.registerIsEmail(userName)) {
      promise = TuyaUserApi.registerAccountWithEmail({
        countryCode,
        email: userName,
        code,
        password,
      })
    } else {
      promise = TuyaUserApi.registerAccountWithPhone({
        countryCode,
        phoneNumber: userName,
        validateCode: code,
        password,
      })
    }
    promise.then(() => this.props.navigation.dispatch(resetAction('HomePage')))
      .catch((error) => this.showToast(error.toString()));
  }

  renderHeaderView() {
    return <HeadView centerText={'Register'} leftOnPress={() => this.props.navigation.pop()} />
  }
  renderContent() {
    return (
      <View style={styles.container}>
        {
          [
            {
              leftText: 'Account',
              value: 'userName'
            },
            {
              leftText: 'Passwrod',
              value: 'password'
            },
            {
              leftText: 'CountryCode',
              value: 'countryCode'
            },
            {
              leftText: 'code',
              value: 'code'
            }
          ].map(d => <EditItem key={d.value} leftText={d.leftText} value={this.state[d.value]} onChangeText={(data) => {
            this.setState({
              [d.value]: data
            })
          }} />)
        }
        <ButtonX
          style={styles.button}
          onPress={() => this.getCode()}
          text="get Code"
          textStyle={{ color: 'white' }}
        />
        <ButtonX
          style={styles.button}
          onPress={() => this.register()}
          text="register"
          textStyle={{ color: 'white' }}
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
  button: {
    width: 300,
    height: 48,
    backgroundColor: '#FF4800',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 4,
    marginTop: 50
  }
});
