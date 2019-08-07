import React, { Component } from 'react';
import {
  View, StyleSheet, Image, ImageBackground,
  ScrollView
} from 'react-native';
import ButtonX from '../../common/ButtonX';

export default class LoginHomePage extends Component {
  constructor(props) {
    super(props);
  }
 
  getButton() {
    return [
      {
        navigate: 'LoginPage',
        text: 'Password login'
      },
      {
        navigate: 'LoginWithCodePage',
        text: 'code login'
      },
      {
        navigate: 'RegisterPage',
        text: 'Creating Account'
      },
      {
        navigate: 'ResetPassWordPage',
        text: 'Reset PassWord'
      },
    ]
  }
  render() {
    return (
      <ImageBackground source={require('../../res/images/login_bg.png')} style={{ flex: 1 }}>
       <ScrollView>
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
          {
            this.getButton().map(d => <ButtonX
              key={d.navigate}
              style={styles.buttonStyle}
              onPress={() => {
                this.props.navigation.navigate(d.navigate);
              }}
              textStyle={styles.textStyle}
              text={d.text}
            />)
          }
        </View>
       </ScrollView>
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
  textStyle: {
    color: '#DBD7D5', fontSize: 16
  },
  tips: {
    fontSize: 29,
  },
  buttonStyle:{
    width: 240,
    height: 48,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#FFFFFF',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
