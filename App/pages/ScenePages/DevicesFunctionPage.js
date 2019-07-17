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
  arrowRight: require('../../res/images/Arrow_right.png'),
};

export default class DevicesFunctionPage extends Component {
  constructor(props) {
    super(props);

    const params = this.props.navigation.state.params;
    console.log('DevicesFunctionPage', params);
    this.state = {
      onTop: true,
      devId: params.devId,
      FunctionList: [],
      devName: params.devName,
      isFromScene: params.isFromScene,
    };
  }

  componentDidMount() {
    TuyaSceneApi.getDeviceConditionOperationList({
      devId: this.state.devId,
    })
      .then((data) => {
        console.log('--->getDeviceConditionOperationList', data);
        this.setState({
          FunctionList: data,
        });
      })
      .catch((err) => {
        console.log('---->Err', err);
      });
  }

  _renderFunList(data) {
    return (
      <View
        style={{
          width,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <Image source={{ uri: data.item.iconUrl }} />
        <Text style={{ fontSize: 16, color: 'black' }}>{data.item.name}</Text>
      </View>
    );
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
          title="选择功能"
        />

        <FlatList
          data={this.state.FunctionList}
          // data={[{ title: 'aaa' }, { title: 'bbb' }]}
          renderItem={// console.log("DevicesFunctionPage--->item", item);
                      ({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            if (item.type == 'bool') {
                              // 进入开关
                              this.props.navigation.navigate('ActionBoolPage', {
                                item,
                                devId: this.state.devId,
                                devName: this.state.devName,
                                isFromScene: this.state.isFromScene,
                              });
                            } else if (item.type == 'enum') {
                            } else if (item.type == 'value') {
                            }
                          }}
                        >
                          <View
                            style={{
                              width,
                              height: 50,
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}
                          >
                            <Text style={{ fontSize: 16, color: 'black', marginLeft: 20 }}>{item.name}</Text>
                            <Image style={{ marginRight: 20 }} source={Res.arrowRight} />
                          </View>
                        </TouchableOpacity>
                      )
          }
          style={{ width }}
        />
      </View>
    );
  }
}
