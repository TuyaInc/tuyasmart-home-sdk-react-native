import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  Switch,
  TouchableOpacity,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../utils/ViewUtils';
import TuyaDeviceApi from '../api/TuyaDeviceApi';
import { resetAction } from '../navigations/AppNavigator';

const { height, width } = Dimensions.get('window');

export default class DeviceDetailPage extends Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;

    const newArr = new Array();
    for (let i = 0, j = params.schema.length; i < j; i++) {
      if (params.schema[i].property !== undefined) {
        newArr.push(params.schema[i]);
      }
    }
    const dps = params.devInfo.dps;
    console.log('---->dps', dps);
    const newData = [];
    for (let i = 0, j = newArr.length; i < j; i++) {
      newArr[i].dpValue = dps[newArr[i].id];
      newData.push(newArr[i]);
    }
    this.state = {
      initScheme: newArr,
      devId: params.devId,
      devInfo: params.devInfo,
      schema: newData,
      title: params.devInfo.name,
    };
  }

  componentDidMount() {
    TuyaDeviceApi.registerDevListener(
      { devId: this.state.devId },
      (data) => {
        console.log('onDpUpdate', data);
        const dpStr = data.dpStr;
        const dps = JSON.parse(dpStr);
        const initData = this.state.initScheme;
        const newData = [];
        for (let i = 0, j = initData.length; i < j; i++) {
          initData[i].dpValue = dps[initData[i].id];
          newData.push(initData[i]);
        }
        console.log('onDpUpdate ---newData', newData);
        this.setState({
          schema: newData,
        });
      },
      (data) => {
        console.warn('onRemoved', data);
      },
      (data) => {
        console.warn('onStatusChanged', data);
      },
      (data) => {
        // Android 是bool值， ios传的是 string
        console.warn('onNetworkStatusChanged', data);
      },
      (data) => {
        console.warn('onDevInfoUpdate', data);
      },
    );
  }

  getRightView(mode, type, range, dpId, dpValue) {
    // rw 可操作 ，ro只可获取
    if (mode == 'rw') {
      if (type) {
        if (type == 'bool') {
          return (
            <Switch
              style={{ marginRight: 20 }}
              onValueChange={(value) => {
                const command = {};
                command[dpId] = !dpValue;
                console.log('--->command', command);
                TuyaDeviceApi.send({
                  devId: this.state.devId,
                  command,
                })
                  .then((data) => {
                    console.warn('--->data', data);
                  })
                  .catch((err) => {
                    console.warn('--->err', err);
                  });
              }}
              value={dpValue}
              thumbColor="white"
              trackColor="#7DB428"
              trackColor="#A09E9B"
            />
          );
        } if (type == 'enum') {
          return (
            <View style={{ height: 50, width: 150 }}>
              <FlatList
                data={range}
                horizontal
                renderItem={item => (
                  <TouchableOpacity
                    style={{
                      height: 50,
                      margin: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 14, color: 'black' }}>{item.item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          );
        }
      }
    }
  }

  renderRightButton() {
    return (
      <TouchableOpacity
        style={{ width: 30, height: 25 }}
        onPress={() => {
          // console.log("--->this", this.state.devInfo);
          this.props.navigation.navigate('DeviceSettingPage', {
            devId: this.state.devId,
            devInfo: this.state.devInfo,
          });
        }}
      >
        <Image source={require('../res/images/setting.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{ backgroundColor: '#F4F4F5', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          title={this.state.title}
          rightButton={this.renderRightButton(this.props)}
        />
        <FlatList
          data={this.state.schema}
          renderItem={// console.log("---->detail item", item);
                      ({ item }) => (
                        <View
                          style={{
                            width: 0.9 * width,
                            height: 50,
                            borderRadius: 6,
                            backgroundColor: '#FFFFFF',
                            flexDirection: 'row',
                            marginTop: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ color: '#444444', fontSize: 15, marginLeft: 10 }}>{item.name}</Text>
                          {this.getRightView(item.mode, item.property.type, item.property.range, item.id, item.dpValue)}
                        </View>
                      )
          }
        />
        <TouchableOpacity
          style={{
            height: 50,
            width,
            backgroundColor: 'yellow',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            this.props.navigation.navigate('TimerHomePage', {
              devId: this.state.devId,
              devInfo: this.state.devInfo,
            });
          }}
        >
          <Text style={{ color: 'black' }}>进入定时页面</Text>
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
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  tips: {
    fontSize: 29,
  },
});
