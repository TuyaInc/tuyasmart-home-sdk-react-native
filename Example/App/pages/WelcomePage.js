import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Platform,
} from 'react-native';
import { StackNavigator, StackActions, NavigationActions } from 'react-navigation';
import NavigationBar from '../common/NavigationBar';
import TuyaCoreApi from '../api/TuyaCoreApi';
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
    if (Platform.OS == 'ios') {
      TuyaCoreApi.initWithOptions({
        appKey: 'xxxxxxxxxxxxxxxxxxxxxxx',
        appSecret: 'xxxxxxxxxxxxxxxxxxxxxxx',
      });
    } else {
      TuyaCoreApi.initWithOptions({
        appKey: 'xxxxxxxxxxxxxxxxxxxxxxx',
        appSecret: 'xxxxxxxxxxxxxxxxxxxxxxx',
      });
    }
  }

  componentDidMount() {
    DeviceStorage.getUserInfo()
      .then((data) => {
        console.log('DeviceStorage.getUserInfo', data);
        if (data != null) {
          console.log('data1', data);
          this.props.navigation.dispatch(resetAction);
        } else {
          console.log('data2', data);
          this.timer = setTimeout(() => {
            this.props.navigation.dispatch(resetActionLogin);
          }, TIME);
        }
      })
      .catch((error) => {
        console.log('DeviceStorage.getUserInfo', error);
        this.timer = setTimeout(() => {
          this.props.navigation.dispatch(resetActionLogin);
        }, TIME);
      });

    // this.timer=setTimeout(()=> {
    //    this.props.navigation.navigate('HomePage');
    // }, 2000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title="欢迎" style={{ backgroundColor: '#6495ED' }} />
        <Text style={styles.tips}>欢迎</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tips: {
    fontSize: 29,
  },
});
