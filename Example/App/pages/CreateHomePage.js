import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions,
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import ButtonX from '../standard/components/buttonX';
import TextButton from '../component/TextButton';
import TuyaUserApi from '../api/TuyaUserApi';
import { resetAction } from '../navigations/AppNavigator';

const { height, width } = Dimensions.get('window');

export default class CreateHomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 200,
          }}
        >
          开启您的智能生活
        </Text>
        <TextButton
          title="创建家庭"
          onPress={() => {
            this.props.navigation.navigate('CreateHomeListPage');
          }}
          style={{ width: 0.4 * width, marginTop: 20 }}
        />
        <ButtonX
          style={{ marginTop: 250 }}
          onPress={() => {
            TuyaUserApi.logout()
              .then((data) => {
                console.warn('---->', data);
                this.refs.toast.show('退出成功');
                this.props.navigation.dispatch(resetAction('LoginHomePage'));
              })
              .catch((err) => {
                console.warn('err', err);
              });
          }}
        >
          <Text style={{ fontSize: 12, color: '#2196F3' }}>退出登陆</Text>
        </ButtonX>
        <Toast
          ref="toast"
          style={{ backgroundColor: '#7DB428' }}
          position="bottom"
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
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  tips: {
    fontSize: 29,
  },
});
