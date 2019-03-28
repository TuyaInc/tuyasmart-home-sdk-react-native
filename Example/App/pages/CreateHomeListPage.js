import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions, TouchableOpacity,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ButtonX from '../standard/components/buttonX';
import ViewUtils from '../utils/ViewUtils';
import TuyaHomeManagerApi from '../api/TuyaHomeManagerApi';

const { height, width } = Dimensions.get('window');
export default class CreateHomeListPage extends Component {
  constructor(props) {
    super(props);
  }

  _renderRightBtn() {
    return (
      <ButtonX
        onPress={() => {
          TuyaHomeManagerApi.createHome({
            name: '我的家',
            lon: 80.99,
            lat: 80.99,
            geoName: '北京',
            rooms: ['客厅', '主卧'],
          })
            .then((data) => {
              this.props.navigation.navigate('HomePage');
            })
            .catch((err) => {
              console.warn('err', err);
            });
        }}
      >
        <Text style={{ fontSize: 18, color: 'black', marginRight: 10 }}>保存</Text>
      </ButtonX>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{ backgroundColor: '#FFFFFF', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          rightButton={this._renderRightBtn()}
          title="家庭设置"
        />
        <TouchableOpacity
          style={{
            width,
            height: 60,
            marginTop: 30,
            backgroundColor: 'red',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Text style={{ color: '#A2A3AA', fontSize: 16, marginLeft: 10 }}>家庭名称</Text>
            <Text style={{ fontSize: 16, color: 'black', marginRight: 80 }}>我的家</Text>
            <Image style={{ marginRight: 10 }} source={require('../res/images/Arrow_right.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width,
            height: 60,
            marginTop: 1,
            backgroundColor: 'red',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Text style={{ color: '#A2A3AA', fontSize: 16, marginLeft: 10 }}>家庭位置</Text>
            <Text style={{ fontSize: 16, color: 'black', marginRight: 80 }}>浙江杭州</Text>
            <Image style={{ marginRight: 10 }} source={require('../res/images/Arrow_right.png')} />
          </View>
        </TouchableOpacity>
        <Text style={{ color: '#81828B', fontSize: 13, marginTop: 10 }}>在哪些房间有智能设备:</Text>
        <TouchableOpacity
          style={{
            width,
            height: 60,
            marginTop: 10,
            backgroundColor: 'red',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Text style={{ color: 'black', fontSize: 16, marginLeft: 10 }}>客厅</Text>
            <Image style={{ marginRight: 10 }} source={require('../res/images/select.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width,
            height: 60,
            marginTop: 1,
            backgroundColor: 'red',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Text style={{ color: 'black', fontSize: 16, marginLeft: 10 }}>主卧</Text>
            <Image style={{ marginRight: 10 }} source={require('../res/images/select.png')} />
          </View>
        </TouchableOpacity>
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

    backgroundColor: '#F8F8F8',
  },
  tips: {
    fontSize: 29,
  },
});
