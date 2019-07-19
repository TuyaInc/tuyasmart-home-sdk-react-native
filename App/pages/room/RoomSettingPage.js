import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SwipeableFlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl
} from 'react-native';
import { TuyaHomeApi } from '../../../sdk'

import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';
const { width } = Dimensions.get('window');

export default class RoomSettingPage extends Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      ...params
    };
  }

  componentDidMount(){
    this.getRoomList()
  }
  componentWillUnmount(){
    this.state.refreshHome()
  }
  getRoomList() {
    TuyaHomeApi.queryRoomList({
      homeId: this.state.homeId,
    })
      .then((data) => {
        this.setState({
          roomList: data,
        });
      })
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
            .then(() => {
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
        }}
      >
        <View style={styles.quick}>
          <Text style={styles.delete}>delete</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  _renderFooter() {
    return <Text style={{ fontSize: 18, color: 'black' }}>No room is currently set up</Text>;
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
          title="Room management"
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
          refreshControl={(
            <RefreshControl
              onRefresh={() => { this.getRoomList()}}
              refreshing={false}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          )}
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
          <Text style={{ fontSize: 18, color: '#FF4800', marginLeft: 15 }}>Adding rooms</Text>
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
