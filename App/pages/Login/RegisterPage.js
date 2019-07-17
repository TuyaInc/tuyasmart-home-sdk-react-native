import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, TextInput, TouchableOpacity, Dimensions,
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import CheckUtils from '../../utils/CheckUtils';
import CountDownButton from '../../component/CountDownButton';
import Strings from '../../i18n';
import TextButton from '../../component/TextButton';
import TuyaUserApi from '../../api/TuyaUserApi';
import DeviceStorage from '../../utils/DeviceStorage';
import { resetAction } from '../../navigations/AppNavigator';

const { height, width } = Dimensions.get('window');

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codettile: Strings.Verification_code,
      ValidateCode: '',
      password: '',
      canreigstr: true,
      useName: '',
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
    if (CheckUtils.registerIsEmail(this.state.useName)) {
      TuyaUserApi.getRegisterEmailValidateCode({
        countryCode: '86',
        email: `${this.state.useName}`,
      })
        .then((data) => {
          const requestSucc = true;
          shouldStartCounting && shouldStartCounting(requestSucc);
        })
        .catch((error) => {
          const requestSucc = true;
          shouldStartCounting && shouldStartCounting(requestSucc);
          this.refs.toast.show(error.toString().slice(7));
        });
    } else {
      TuyaUserApi.getValidateCode({
        countryCode: '86',
        phoneNumber: `${this.state.useName}`,
      })
        .then((data) => {
          const requestSucc = true;
          shouldStartCounting && shouldStartCounting(requestSucc);
        })
        .catch((error) => {
          const requestSucc = true;
          shouldStartCounting && shouldStartCounting(requestSucc);
          this.refs.toast.show(error.toString().slice(7));
        });
    }
  }

  _registerBtn() {
    if (CheckUtils.registerIsEmail(this.state.useName)) {
      if (CheckUtils.isVaValidateCode(this.state.ValidateCode) && CheckUtils.isPassWord(this.state.password)) {
        // email
        TuyaUserApi.registerAccountWithEmail({
          countryCode: '86',
          email: this.state.useName,
          code: this.state.ValidateCode,
          password: this.state.password,
        })
          .then((data) => {
            // 跳转到创建家庭
            DeviceStorage.saveUserInfo(this.state.useName, this.state.password, '86');
            this.props.navigation.dispatch(resetAction('CreateHomePage'));
          })
          .catch((error) => {
            if (error.code == '1506' || error.code == 'IS_EXISTS') {
              this.setState({
                canreigstr: false,
              });
            }
            this.refs.toast.show(error.toString().slice(7));
          });
      } else {
        this.refs.toast.show('验证码或密码输入有误');
      }
    } else if (CheckUtils.isVaValidateCode(this.state.ValidateCode) && CheckUtils.isPassWord(this.state.password)) {
      TuyaUserApi.registerWithPhone({
        countryCode: '86',
        phoneNumber: this.state.useName,
        validateCode: this.state.ValidateCode,
        password: this.state.password,
      })
        .then((data) => {
          // 跳转到创建家庭
          DeviceStorage.saveUserInfo(this.state.useName, this.state.password, '86');
          this.props.navigation.dispatch(resetAction('CreateHomePage'));
        })
        .catch((error) => {
          if (error.code == '1506' || error.code == 'IS_EXISTS') {
            this.setState({
              canreigstr: false,
            });
          }
          this.refs.toast.show(error.toString().slice(7));
        });
    } else {
      this.refs.toast.show('验证码或密码输入有误');
    }
  }

  render() {
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
          注册
        </Text>
        <ButtonX style={{ height: 40, marginTop: 30 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#E6E6E6',
              paddingBottom: 10,
              marginLeft: 30,
              marginRight: 30,
              width: width * 0.85,
            }}
          >
            <Text>中国+86</Text>
            <Image source={require('../../res/images/Arrow_right.png')} />
          </View>
        </ButtonX>
        <TextInput
          onChangeText={(value) => {
            this.setState({
              useName: value,
            });
          }}
          placeholder={Strings.phoneNumberOrEmaill}
          placeholderTextColor="#C3C3C9"
          style={styles.textInputStyle}
          multiline={false}
          underlineColorAndroid="transparent"
        />
        <TextInput
          onChangeText={(value) => {
            this.setState({
              password: value,
            });
          }}
          placeholder={Strings.Password}
          placeholderTextColor="#C3C3C9"
          style={styles.textInputStyle}
          multiline={false}
          underlineColorAndroid="transparent"
        />
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
            enable={this.state.canreigstr && this.state.codettile == Strings.Verification_code}
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
          title="注册"
        />
        <Toast
          ref="toast"
          style={{ backgroundColor: '#7DB428' }}
          position="top"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
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
  tips: {
    fontSize: 29,
  },
  rowViewStyle: {
    width: width * 0.95,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
  },
  textInputStyle: {
    height: 40,
    borderColor: '#EAEAEA',
    borderBottomWidth: 1,
    width: width * 0.85,
    marginLeft: 30,
    marginRight: 30,
  },
  textInputStyle2: {
    height: 40,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    width: 220,
    marginLeft: 30,
    paddingLeft: 17,
  },
});
