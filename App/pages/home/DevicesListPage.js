import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  DeviceEventEmitter,
  Alert
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { TuyaHomeManagerApi, TuyaHomeApi, } from '../../../sdk'
import HeadView from '../../common/HeadView';
import BaseComponet from '../../common/BaseComponent';

import { storeHomeId } from '../../redux/action';
import { resetAction } from '../../navigations/AppNavigator';
import DevicesTab from './DevicesTab';
import Item from '../../common/Item'
const { height, width } = Dimensions.get('window');

class DevicesListPage extends BaseComponet {
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
    this.getData()
    this.refreshListener = DeviceEventEmitter.addListener('refresh', () => {
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

  getRoomList(homeId) {
    TuyaHomeApi.queryRoomList({
      homeId,
    })
      .then((data) => {
        for (let i = 1, j = data.length; i < j; i++) {
          data[i].key = i + 1;
        }
        this.setState({
          roomList: data,
        });
      })
      .catch((err) => {
        console.warn('-room', err);
      });
  }
  getData() {
    TuyaHomeManagerApi.queryHomeList()
      .then((data) => {
        if (data.length !== 0) {
          this.setState({
            homeName: data[0].name,
            HomeList: data,
            homeId: data[0].homeId,
          });
          DeviceEventEmitter.emit('setHomeId', data[0].homeId);
          this.props.dispatch(storeHomeId(data[0].homeId));
          this.getRoomList(data[0].homeId)
        } else {
          this.props.navigation.dispatch(resetAction('CreateHomePage'));
        }
      })
      .catch((err) => {
        console.warn('--->err', err);
      });
  }


  renderLeftButton(name) {
    return (
      <Text style={{
        fontSize: 14, fontWeight: 'bold', color: 'black', paddingLeft: 20,
      }}
        onPress={() => {
          this.setState({ showHomeSetting: true })
        }}
      >
        {name}
      </Text>
    );
  }


  renderHeaderView() {
    return <HeadView
      leftText={this.state.homeName}
      style={{ backgroundColor: 'white', marginBottom: 10 }}
      leftOnPress={() => this.setState({ showHomeSetting: true })}
      rightOnPress={() => this.props.navigation.navigate('ConfigPage', {
        homeId: this.state.homeId,
      })}
      rightVisable={true}
      rightText={'Add Device'}
    />
  }

  _renderHomeItem(data) {
    return (
        <Item
          onPress={() => {
            Alert.alert(
              'delete',
              'delete home',
              [
                {
                  text: 'OK', onPress: () => {
                    TuyaHomeApi.dismissHome({ homeId: data.homeId }).then(() => this.getData())
                  }
                },
                { text: 'Cancel', onPress: () => { } },
              ],
              { cancelable: false }
            )
          }}
          leftText={data.name}
        />
    );
  }

  _renderFooter() {
    return (
      <Item
        leftText={'Creating Home'}
        onPress={() => {
          this.setState({
            showHomeSetting: false,
          });
          this.props.navigation.navigate('CreateHomeListPage');
        }}
      />
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
          <View>
            <FlatList
              data={this.state.HomeList}
              renderItem={({ item }) => this._renderHomeItem(item)}
              style={{ width }}
              ListFooterComponent={this._renderFooter()}
            />
          </View>
        </View>
      </Modal>
    );
  }

  renderContent() {
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
          }}
          renderTabBar={() => <ScrollableTabBar style={{ height: 40, borderWidth: 0 }} tabStyle={{ height: 39 }} />}
        >
          <DevicesTab
            key={0}
            tabLabel="All device"
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
                refreshHome: () => this.getRoomList(this.state.homeId)
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
        {content}
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
    paddingTop: 20,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});
export default connect(() => ({}))(DevicesListPage);
