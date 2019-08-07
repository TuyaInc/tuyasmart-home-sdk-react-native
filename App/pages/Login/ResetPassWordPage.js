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


export default class ResetPassWordPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName,
      password,
      countryCode,
      code: '',
      newPassword: password
    }
  }

  componentWillUnmount() {
    TuyaUserApi.onDestroy()
  }

  getCode() {
    const { userName, countryCode } = this.state
    if (CheckUtils.registerIsEmail(userName)) {
      TuyaUserApi.getEmailValidateCode({
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

  reset() {
    const { userName, password, countryCode, newPassword,code } = this.state
    if (!countryCode || !userName || !password || password != newPassword) return
    let promise = ''
    if (userName.indexOf('@') >= 0) {
      promise = TuyaUserApi.resetEmailPassword({
        email: userName,
        validateCode: code,
        newPassword,
        countryCode,
      })
    } else {
      promise = TuyaUserApi.resetPhonePassword({
        phoneNumber: userName,
        code,
        newPassword,
        countryCode,
      })
    }
    promise.then(() => {
      this.showToast('success')
      this.props.navigation.pop();
    })
      .catch((error) => {
        this.showToast(error.toString())
      });
  }
  renderHeaderView() {
    return <HeadView leftOnPress={() => this.props.navigation.pop()} centerText={'reset'} />
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
              leftText: 'New Passwrod',
              value: 'newPassword'
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
          onPress={() => this.reset()}
          text="reset"
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
