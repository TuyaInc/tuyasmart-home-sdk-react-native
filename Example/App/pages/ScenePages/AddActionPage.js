import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Switch,
  FlatList,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import { resetAction } from '../../navigations/AppNavigator';
import TuyaUserApi from '../../api/TuyaUserApi';
import DeviceStorage from '../../utils/DeviceStorage';
import TextButton from '../../component/TextButton';
import ViewUtils from '../../utils/ViewUtils';
import TuyaSceneApi from '../../api/TuyaSceneApi';

const { height, width } = Dimensions.get('window');
const Res = {
  scenebg: require('../../res/images/scenebg.png'),
  redAdd: require('../../res/images/red_add.png'),
  plug: require('../../res/images/plug.png'),
};

export default class AddActionPage extends Component {
  constructor(props) {
    super(props);

    const params = this.props.navigation.state.params;
    this.state = {
      onTop: true,
      DevicesLists: [],
      isFromScene: params.isFromScene,
    };
  }

  componentDidMount() {
    TuyaSceneApi.getConditionDevList({ homeId: 2040920 })
      .then((data) => {
        console.log('--->getConditionDevList', data);
        this.setState({
          DevicesLists: data,
        });
      })
      .catch((err) => {
        console.log('--->err', err);
      });
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#F8F8F8',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flex: 1,
        }}
      >
        <NavigationBar
          style={{ backgroundColor: '#F4F4F5', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          title="选择动作"
        />
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: 45,
            }}
          >
            <Image source={Res.plug} style={{ marginLeft: 20 }} />
            <Text style={{ color: '#22242C', fontSize: 16, marginLeft: 20 }}>控制智能设备</Text>
          </View>
          <FlatList
            data={this.state.DevicesLists}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('DevicesFunctionPage', {
                    devId: item.devId,
                    devName: item.name,
                    isFromScene: this.state.isFromScene,
                  });
                }}
              >
                <View
                  style={{
                    width,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Image source={{ uri: item.iconUrl }} />
                  <Text style={{ fontSize: 16, color: 'black' }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={{ width }}
          />
        </View>
      </View>
    );
  }
}
