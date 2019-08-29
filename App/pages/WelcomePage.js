import React, { Component } from 'react';
import {
  View, StyleSheet, Text,Platform,NativeModules
} from 'react-native';
import { TuyaCoreApi,TuyaUserApi } from '../../sdk'
import { StackActions, NavigationActions } from 'react-navigation';
import { iosAppKey, iosAppSecret,androidAppKey,androidAppSecret } from '../constant'
const d=NativeModules.TuyaUserModule
const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'HomePage' }), // 要跳转到的页面名字
  ],
});
const resetActionLogin = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'LoginHomePage' }), // 要跳转到的页面名字
  ],
});


export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
    TuyaCoreApi.initWithOptions({
      appKey:Platform.OS=='ios'?iosAppKey:androidAppKey,
      appSecret:Platform.OS=='ios'?iosAppSecret:androidAppSecret,
    });
    TuyaCoreApi.setDebugMode({
      debug:true
    })
  }

  componentDidMount() {
    TuyaUserApi.isLogin().then(d=>{
      if(d){
        this.props.navigation.dispatch(resetAction);
      }else{
        this.props.navigation.dispatch(resetActionLogin);
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tips}>Welcome</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  tips: {
    fontSize: 29,
  },
});
