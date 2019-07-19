import React, { Component } from 'react';
import {
  View, StyleSheet, Text, 
} from 'react-native';
import { TuyaCoreApi } from '../../sdk'
import { StackActions, NavigationActions } from 'react-navigation';
import NavigationBar from '../common/NavigationBar';
import { appKey, appSecret } from '../constant'
import DeviceStorage from '../utils/DeviceStorage';

const TIME = 2000;
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

// import HomePage from './HomePage'

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
    TuyaCoreApi.initWithOptions({
      appKey: appKey,
      appSecret: appSecret,
    });
  }

  componentDidMount() {
    DeviceStorage.getUserInfo()
      .then((data) => {
        if (data != null) {
          this.props.navigation.dispatch(resetAction);
        } else {
          this.timer = setTimeout(() => {
            this.props.navigation.dispatch(resetActionLogin);
          }, TIME);
        }
      })
      .catch(() => {
        this.timer = setTimeout(() => {
          this.props.navigation.dispatch(resetActionLogin);
        }, TIME);
      });

  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
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
