import React from 'react';
import {
  View, StyleSheet, Text, Image, TextInput, TouchableOpacity, Dimensions,
} from 'react-native';
import {TuyaUserApi} from '../../../sdk'

import NavigationBar from '../../common/NavigationBar';
import CheckUtils from '../../utils/CheckUtils';
import CountDownButton from '../../component/CountDownButton';
import Strings from '../../i18n';
import TextButton from '../../component/TextButton';
import DeviceStorage from '../../utils/DeviceStorage';
import { resetAction } from '../../navigations/AppNavigator';
import BaseComponent from '../../component/BaseComponet'
import { userName, password, countryCode } from '../../constant'
const {  width } = Dimensions.get('window');

export default class RegisterPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      codettile: Strings.Verification_code,
      ValidateCode: '',
    };
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

  _requestAPI(shouldStartCounting) {
    if (CheckUtils.registerIsEmail(userName)) {
      TuyaUserApi.getRegisterEmailValidateCode({
        countryCode,
        email: userName,
      })
        .then(() => {
          const requestSucc = true;
          shouldStartCounting && shouldStartCounting(requestSucc);
        })
        .catch((error) => {
          const requestSucc = true;
          shouldStartCounting && shouldStartCounting(requestSucc);
          this.showToast(error.toString())
        });
    } else {
      TuyaUserApi.getValidateCode({
        countryCode,
        phoneNumber: userName,
      })
        .then(() => {
          const requestSucc = true;
          shouldStartCounting && shouldStartCounting(requestSucc);
        })
        .catch((error) => {
          const requestSucc = true;
          shouldStartCounting && shouldStartCounting(requestSucc);
          this.showToast(error.toString())
        });
    }
  }

  _registerBtn() {
    if (CheckUtils.registerIsEmail(userName)) {
      if (CheckUtils.isVaValidateCode(this.state.ValidateCode) && CheckUtils.isPassWord(password)) {
        // email
        TuyaUserApi.registerAccountWithEmail({
          countryCode,
          email: userName,
          code: this.state.ValidateCode,
          password,
        })
          .then(() => {
            // 跳转到创建家庭
            DeviceStorage.saveUserInfo(userName, password, countryCode);
            this.props.navigation.dispatch(resetAction('CreateHomePage'));
          })
          .catch((error) => {
            this.showToast(error.toString())
          });
      } else {
        this.showToast('Error in validation code or password input')
      }
    } else if (CheckUtils.isVaValidateCode(this.state.ValidateCode) && CheckUtils.isPassWord(password)) {
      TuyaUserApi.registerWithPhone({
        countryCode,
        phoneNumber: userName,
        validateCode: this.state.ValidateCode,
        password,
      })
        .then(() => {
          DeviceStorage.saveUserInfo(userName, password, countryCode);
          this.props.navigation.dispatch(resetAction('CreateHomePage'));
        })
        .catch((error) => {
          this.showToast(error.toString())
        });
    } else {
      this.showToast('Error in validation code or password input')
    }
  }

  renderContent() {
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
          Register
        </Text>
        <Text style={styles.textStyle}>{'Account: '}{userName}</Text>
        <Text style={styles.textStyle}>{'Passwrod: '}{password}</Text>
        <View style={styles.rowViewStyle}>
          <TextInput
            style={styles.textInputStyle2}
            underlineColorAndroid="transparent"
            placeholderText={Strings.Verification_code}
            placeholderTextColor="#C3C3C9"
            onChangeText={(ValidateCode) => {
              this.setState({ ValidateCode });
            }}
            multiline={false}
            maxLength={6}
          />
          <CountDownButton
            onChangeText={(value) => {
              this.setState({
                codettile: value,
              });
            }}
            timerTitle={this.state.codettile}
            enable={this.state.codettile == Strings.Verification_code}
            onClick={(shouldStartCounting) => {
              this._requestAPI(shouldStartCounting);
            }}
            timerEnd={() => {
              this.setState({
                codettile: Strings.Verification_code,
              });
            }}
            textStyle={{ color: 'white' }}
          />
        </View>
        <TextButton
          style={{ marginTop: 50 }}
          onPress={() => {
            this._registerBtn();
          }}
          disabled={false}
          title="Rregister"
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
  rowViewStyle: {
    width: width * 0.95,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
  },
  textInputStyle2: {
    height: 40,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    width: 220,
    marginLeft: 30,
    paddingLeft: 17,
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
