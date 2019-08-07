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


export default class LoginPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName,
      password,
      countryCode
    }
  }

  componentWillUnmount() {
    TuyaUserApi.onDestroy()
  }

  login() {
    const { userName, password, countryCode } = this.state
    if (!countryCode || !userName || !password) return
    let promise = ''
    if (userName.indexOf('@') >= 0) {
      promise = TuyaUserApi.loginWithEmail({
        email: userName,
        password,
        countryCode,
      })
    } else {
      promise = TuyaUserApi.loginWithPhonePassword({
        phoneNumber: userName,
        password: password,
        countryCode: countryCode,
      })
    }
    promise.then(() => this.props.navigation.dispatch(resetAction('HomePage'))).catch((error) => {
      this.showToast(error.toString())
    })
  }
  renderHeaderView() {
    return <HeadView leftOnPress={() => this.props.navigation.pop()} centerText={'login'} />
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
            }
          ].map(d => <EditItem key={d.value} leftText={d.leftText} value={this.state[d.value]} onChangeText={(data) => {
            this.setState({
              [d.value]: data
            })
          }} />)
        }
        <ButtonX
          style={styles.button}
          onPress={() => this.login()}
          text="login"
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
