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
import { userName, countryCode,password} from '../../constant'

export default class LoginWithCodePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName,
      countryCode,
      code: '',
      password,
    };
  }

  componentWillUnmount(){
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

  login() {
    const { userName, countryCode, code } = this.state
    if (!code || !countryCode || !userName ) return
    if (CheckUtils.registerIsEmail(userName)) {
       this.showToast("email + Verification Code Login is not Supported")
    } else {
      TuyaUserApi.loginWithPhone({
        countryCode,
        phoneNumber: userName,
        validateCode: code,
      })
        .then(() => {
          this.props.navigation.dispatch(resetAction('HomePage'));
        })
        .catch((error) => this.showToast(error.toString()));
    }
  }

  renderHeaderView() {
    return <HeadView centerText={'login'} leftOnPress={() => this.props.navigation.pop()} />
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
