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

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codettile: Strings.Verification_code,
      ValidateCode: '',
      password: '',
      canreigstr: true,
      useName: '',
      cityCode: '86',
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

  _loginConfirm() {
    if (this.state.useName.indexOf('@') >= 0) {
      TuyaUserApi.loginWithEmail({
        email: `${this.state.useName}`,
        password: this.state.password,
        countryCode: this.state.cityCode,
      })
        .then((data) => {
          DeviceStorage.saveUserInfo(`${this.state.useName}`, this.state.password, `${this.state.cityCode}`).then(
            () => {
              this.props.navigation.dispatch(resetAction('HomePage'));
            },
          );
        })
        .catch((error) => {
          this.refs.toast.show(error.toString().slice(7));
        });
    } else {
      const LoginEnable = CheckUtils.isPoneAvailable(this.state.useName) && CheckUtils.isPassWord(this.state.password);
      if (LoginEnable) {
        TuyaUserApi.loginWithPhonePassword({
          phoneNumber: this.state.useName,
          password: this.state.password,
          countryCode: this.state.cityCode,
        })
          .then((data) => {
            DeviceStorage.saveUserInfo(this.state.useName, this.state.password, this.state.cityCode).then(() => {
              this.props.navigation.dispatch(resetAction('HomePage'));
            });
          })
          .catch((error) => {
            this.refs.toast.show(error.toString().slice(7));
          });
      } else {
        this.refs.toast.show('密码格式有误');
      }
    }
  }

  render() {
    const disabled = !(this.state.useName.length > 5 && this.state.password.length > 5);
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
          登陆
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
        <TextButton
          style={{ marginTop: 50 }}
          onPress={() => {
            this._loginConfirm();
          }}
          disabled={disabled}
          title="登陆"
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
