import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  RefreshControl,
  Modal,
  DeviceEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import TuyaHomeManagerApi from '../../api/TuyaHomeManagerApi';
import TuyaHomeApi from '../../api/TuyaHomeApi';
import { storeHomeId } from '../../redux/action';
import ratio from '../../utils/ratio';
import { resetAction } from '../../navigations/AppNavigator';
import DevicesTab from './DevicesTab';
import TuyaShareApi from '../../api/TuyaShareApi';

const { height, width } = Dimensions.get('window');

class DevicesListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceList: [],
      homeName: '',
      HomeList: [],
      roomList: [],
      homeId: '',
      showHomeSetting: false,
    };
  }

  componentDidMount() {
    TuyaHomeManagerApi.queryHomeList()
      .then((data) => {
        console.log('--->queryHomeList', data);
        if (data.length !== 0) {
          this.setState({
            homeName: data[0].name,
            HomeList: data,
            homeId: data[0].homeId,
          });
          DeviceEventEmitter.emit('setHomeId', data[0].homeId);
          // console.log("data[0].homeId", data[0].homeId);
          // console.log("---Devthis.props", this.props);
          this.props.dispatch(storeHomeId(data[0].homeId));
          TuyaHomeApi.queryRoomList({
            homeId: data[0].homeId,
          })
            .then((data) => {
              const newData = [];
              for (let i = 1, j = data.length; i < j; i++) {
                data[i].key = i + 1;
              }
              this.setState({
                roomList: data,
              });
              TuyaHomeManagerApi.registerTuyaHomeChangeListener(
                { homeId: this.state.homeId },
                (data) => {
                  console.log('----->onHomeAdded');
                },
                (data) => {
                  console.log('----->onHomeRemoved');
                },
                (data) => {
                  console.log('----->onSharedDeviceList');
                },
                (data) => {
                  console.log('----->onSharedGroupList');
                },
                (data) => {
                  console.log('----->onServerConnectSuccess');
                },
                (data) => {
                  console.log('----->data');
                },
              );
            })
            .catch((err) => {
              console.warn('-room', err);
            });
        } else {
          this.props.navigation.dispatch(resetAction('CreateHomePage'));
        }
      })
      .catch((err) => {
        console.warn('--->err', err);
      });

    this.refreshListener = DeviceEventEmitter.addListener('refresh', () => {
      console.warn('hahahahaha  shuashuaahsuhaushu');
      TuyaHomeManagerApi.queryHomeList()
        .then((data) => {
          console.log('--->queryHomeList', data);
          this.setState({
            roomList: data[0].rooms,
          });
        })
        .catch((err) => {
          console.warn('--->err', err);
        });
    });
  }

  componentWillUnmount() {
    this.refreshListener.remove();
  }

  renderLeftButton(name) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            showHomeSetting: true,
          });
        }}
      >
        <Text style={{
          fontSize: 14, fontWeight: 'bold', color: 'black', marginLeft: 20,
        }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  renderRightButton() {
    return (
      <TouchableOpacity
        style={{ width: 30, height: 25 }}
        onPress={() => {
          this.props.navigation.navigate('ConfigPage', {
            homeId: this.state.homeId,
          });
        }}
      >
        <Image source={require('../../res/images/ic_add.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    );
  }

  _renderHomeItem(data) {
    return (
      <View
        style={{
          width,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 16, color: 'black' }}>{data.item.name}</Text>
      </View>
    );
  }

  _renderFooter(props) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            showHomeSetting: false,
          });
          this.props.navigation.navigate('CreateHomeListPage');
        }}
      >
        <View
          style={{
            width,
            height: 56,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Image source={require('../../res/images/homeSetting.png')} />
          <Text style={{ color: '#22242C', fontSize: 16 }}>家庭管理</Text>
          <Image source={require('../../res/images/Arrow_right.png')} />
        </View>
      </TouchableOpacity>
    );
  }

  showHome() {
    return (
      <Modal
        animationType="slide"
        transparent
        visible
        onRequestClose={() => {
          this.setState({ showHomeSetting: false });
        }}
      >
        <View style={styles.marks}>
          <View style={{ backgroundColor: '#FFFFFF', height: 200 }}>
            <FlatList
              data={this.state.HomeList}
              // data={[{ title: 'aaa' }, { title: 'bbb' }]}
              renderItem={this._renderHomeItem}
              style={{ width }}
              ListFooterComponent={this._renderFooter(this.props)}
            />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const content = this.state.roomList.length > 0 ? (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          tabBarUnderlineStyle={{ backgroundColor: '#FFFFFF' }}
          tabBarInactiveTextColor="#81828B"
          tabBarActiveTextColor="#22242C"
          ref="scrollableTabView"
          tabBarBackgroundColor="#FFFFFF"
          initialPage={0}
          onChangeTab={(obj) => {
            // console.log("index:" + obj.i);
          }}
          renderTabBar={() => <ScrollableTabBar style={{ height: 40, borderWidth: 0 }} tabStyle={{ height: 39 }} />}
        >
          <DevicesTab
            key={0}
            tabLabel="所有设备"
            id={this.state.HomeList[0].homeId}
            isRoom={false}
            {...this.props}
          />
          {this.state.roomList.map((result, i, arr) => {
            const room = arr[i];
            return <DevicesTab key={i + 1} tabLabel={room.name} id={room.roomId} isRoom {...this.props} />;
          })}
        </ScrollableTabView>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate('RoomSettingPage', {
                roomList: this.state.roomList,
                homeId: this.state.homeId,
              });
            }}
          >
            <Image source={require('../../res/images/setting.png')} />
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{ backgroundColor: '#FFFFFF', width }}
          leftButton={this.renderLeftButton(this.state.homeName)}
          rightButton={this.renderRightButton()}
        />
        {content}
        {/* <ImageBackground
          source={require("../../res/images/weather.png")}
          style={{
            width: 0.9 * width,
            height: 80,
            marginTop: 20,
            borderRadius: 10
          }}
        >
          <View />
        </ImageBackground> */}
        {this.state.showHomeSetting && this.showHome()}
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
  marks: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});
export default connect(() => ({}))(DevicesListPage);
