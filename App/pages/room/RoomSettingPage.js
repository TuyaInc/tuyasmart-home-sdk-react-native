import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  SwipeableFlatList,
  TouchableOpacity,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';
import ButtonX from '../../standard/components/buttonX';
import TuyaHomeManagerApi from '../../api/TuyaHomeManagerApi';
import TuyaHomeApi from '../../api/TuyaHomeApi';
// import from '../../../node_modules/tuyasdk-react-native/src/index'
const { height, width } = Dimensions.get('window');

export default class RoomSettingPage extends Component {
  constructor(props) {
    super(props);

    const params = this.props.navigation.state.params;
    this.state = {
      roomList: params.roomList,
      homeId: params.homeId,
    };
  }

  componentDidMount() {
    this.refreshListener = DeviceEventEmitter.addListener('refresh', () => {
      console.warn('hahahahaha  shuashuaahsuhaushu');
      // IOS没有queryHomelist ,这里该用gethomeDetail（）
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

  renderRightButton(name) {
    return (
      <TouchableOpacity onPress={() => {}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: 'black',
            marginRight: 15,
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  // 侧滑菜单渲染
  getQuickActions = item => (
    <View style={styles.quickAContent}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          TuyaHomeApi.removeRoom({
            homeId: this.state.homeId,
            roomId: item.roomId,
          })
            .then((data) => {
              const list = this.state.roomList;
              const newArr = new Array();
              for (let i = 0, j = list.length; i < j; i++) {
                if (list[i].roomId !== item.roomId) {
                  newArr.push(list[i]);
                }
              }

              this.setState({
                roomList: newArr,
              });
            })
            .catch((err) => {
              console.log('-->Err', err);
            });
        }}
      >
        <View style={styles.quick}>
          <Text style={styles.delete}>删除</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  _renderFooter() {
    return <Text style={{ fontSize: 18, color: 'black' }}>当前没有设置房间 (^_^)v</Text>;
  }

  _renderItem(data) {
    return (
      <View style={styles.itemStyle} key={data.item.index}>
        <Text style={{ fontSize: 18, color: 'black', marginLeft: 20 }}>{data.item.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="房间管理"
          style={{ backgroundColor: '#FFFFFF', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
        />
        <SwipeableFlatList
          data={this.state.roomList}
          ref={(ref) => {
            this._flatListRef = ref;
          }}
          renderItem={this._renderItem}
          style={{ width, marginTop: 20, flex: 1 }}
          renderQuickActions={({ item }) => this.getQuickActions(item)} // 创建侧滑菜单
          maxSwipeDistance={80} // 可展开（滑动）的距离
          bounceFirstRowOnMount // 进去的时候不展示侧滑效果
          ListEmptyComponent={this._renderFooter(this.props)}
        />
        <TouchableOpacity
          style={{
            width,
            height: 60,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
          onPress={() => {
            this.props.navigation.navigate('AddRoomPage', {
              homeId: this.state.homeId,
            });
          }}
        >
          <Text style={{ fontSize: 18, color: '#FF4800', marginLeft: 15 }}>添加房间</Text>
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
  },
  tips: {
    fontSize: 29,
  },
  delete: {
    color: '#d8fffa',
  },
  quickAContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 58,
  },
  quick: {
    backgroundColor: 'red',
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 1,
    width,
    backgroundColor: '#FFFFFF',
  },
});
