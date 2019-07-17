import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import { resetAction } from '../../navigations/AppNavigator';
import TuyaUserApi from '../../api/TuyaUserApi';
import DeviceStorage from '../../utils/DeviceStorage';
import TextButton from '../../component/TextButton';

const { height, width } = Dimensions.get('window');

export default class MyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        headPic: '',
      },
    };
    TuyaUserApi.getCurrentUser()
      .then((data) => {
        console.log('----get cr', data);
        if (data == null || data == undefined) {
          // this.logout()
        } else if (data.username) {
          this.setState({
            user: data,
          });
        } else {
          // this.logout()
        }
      })
      .catch((error) => {
        // this.logout()
      });
  }

  logout() {
    DeviceStorage.delete('userInfo').then((data) => {
      TuyaUserApi.logout()
        .then((data) => {
          console.log('logout', data);
          this.props.navigation.dispatch(resetAction('LoginHomePage'));
        })
        .catch((e) => {
          console.log('logout', e);
          this.props.navigation.dispatch(resetAction('LoginHomePage'));
        });
    });
  }

  render() {
    const headImage = this.state.user.headPic.length > 0 ? (
      <Image source={{ uri: `${this.state.user.headPic}` }} />
    ) : (
      <Image source={require('../../res/images/headPic.png')} />
    );
    return (
      <View style={styles.container}>
        <View
          style={{
            width,
            height: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 15,
          }}
        >
          <Text>Account</Text>
          <Text>{this.state.user.username}</Text>
        </View>
        <View
          style={{
            width,
            height: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 15,
          }}
        >
          <Text>nickName</Text>
          <Text>{this.state.user.nickName}</Text>
        </View>
        <View
          style={{
            width,
            height: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 15,
          }}
        >
          <Text>timezoneId</Text>
          <Text>{this.state.user.timezoneId}</Text>
        </View>
        <View
          style={{
            width,
            height: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 15,
          }}
        >
          <Text>headPic</Text>
          {headImage}
        </View>

        <TextButton
          style={{
            backgroundColor: '#FFFFFF',
            width,
            height: 50,
            marginTop: 50,
          }}
          title="退出登陆"
          onPress={() => {
            this.logout();
          }}
          textStyle={{ color: '#A2A3AA' }}
        />
      </View>
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
    backgroundColor: '#F8F8F8',
  },
  tips: {
    fontSize: 29,
  },
});
