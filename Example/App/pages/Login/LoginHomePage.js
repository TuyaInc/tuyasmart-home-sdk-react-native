import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
// import from '../../../node_modules/tuyasdk-react-native/src/index'

export default class LoginHomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground source={require('../../res/images/login_bg.png')} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            style={{
              height: 150,
              width: 130,
              resizeMode: 'cover',
              marginTop: 150,
            }}
            source={require('../../res/images/tuyaMark.png')}
          />
          <ButtonX
            style={{
              width: 240,
              height: 48,
              borderWidth: 1,
              borderRadius: 100,
              borderColor: '#FFFFFF',
              marginTop: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              console.warn('-');
              this.props.navigation.navigate('RegisterPage');
            }}
          >
            <Text style={{ fontSize: 18, color: '#FFFFFF' }}>创建新账户</Text>
          </ButtonX>
          <ButtonX
            style={{ marginTop: 20 }}
            onPress={() => {
              this.props.navigation.navigate('LoginPage');
            }}
          >
            <Text style={{ color: '#DBD7D5', fontSize: 16 }}>使用已有账户登陆</Text>
          </ButtonX>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tips: {
    fontSize: 29,
  },
});
