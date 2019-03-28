import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions, TouchableOpacity, BackHandler,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import { resetAction } from '../../navigations/AppNavigator';
import TuyaUserApi from '../../api/TuyaUserApi';
import DeviceStorage from '../../utils/DeviceStorage';
import TextButton from '../../component/TextButton';

const { height, width } = Dimensions.get('window');
const Res = {
  enterScene: require('../../res/images/enterCondition.png'),
  enterCondition: require('../../res/images/enterScene.png'),
  Arrow_right: require('../../res/images/Arrow_right.png'),
  exit: require('../../res/images/exit.png'),
};

export default class sceneHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop();
      return true;
    });
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flex: 1,
          backgroundColor: '#F8F8F8',
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 34,
            color: 'black',
            marginTop: 80,
          }}
        >
          添加智能
        </Text>
        <Text style={{ color: '#A2A3AA', fontSize: 17, marginTop: 10 }}>请选择类型</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddScenePage', {
              item: {},
              isEdit: false,
            });
          }}
        >
          <View
            style={{
              backgroundColor: '#3C4173',
              height: 140,
              width: width * 0.95,
              borderRadius: 8,
              marginTop: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Image style={{ marginLeft: 20 }} source={Res.enterScene} />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',

                width: 180,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
              >
                场景
              </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 13 }}>一键控制多设备，或通过智能音箱语音控制</Text>
            </View>
            <Image style={{ marginRight: 30 }} source={Res.Arrow_right} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddAutoPage');
          }}
        >
          <View
            style={{
              backgroundColor: '#6684EF',
              height: 140,
              width: width * 0.95,
              borderRadius: 8,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Image style={{ marginLeft: 20 }} source={Res.enterCondition} />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',

                width: 180,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
              >
                自动化
              </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 13 }}>根据天气、设备、时间等条件，自动执行</Text>
            </View>
            <Image style={{ marginRight: 30 }} source={Res.Arrow_right} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => {
            this.props.navigation.pop();
          }}
        >
          <Image source={Res.exit} style={{ resizeMode: 'stretch' }} />
        </TouchableOpacity>
      </View>
    );
  }
}
