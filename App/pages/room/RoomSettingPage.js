import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  RefreshControl
} from 'react-native';
import { TuyaHomeApi } from '../../../sdk'
import SwipeableFlatList from '../../common/SwiperFlatList'
import BaseComponet from '../../common/BaseComponent';
import HeadView from '../../common/HeadView';
const { width } = Dimensions.get('window');

export default class RoomSettingPage extends BaseComponet {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      homeId:params.homeId,
      roomList:[]
    };
  }

  componentDidMount(){
    this.getRoomList()
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
                this.getRoomList()
                this.swipeableFlatList && this.swipeableFlatList._onClose()
            })
        }}
      >
        <View style={styles.quick}>
          <Text style={styles.delete}>delete</Text>
        </View>
      </TouchableOpacity>
    </View>
  )


  renderHeaderView(){
      return <HeadView centerText={'Room management'} leftOnPress={()=>this.props.navigation.pop()}
      rightOnPress={()=>{
        this.props.navigation.navigate('AddRoomPage', {
          homeId: this.state.homeId,
        });
      }} rightText={'Add Room'} rightVisable={true}/>
  }

  _renderItem(data) {
    return (
      <View style={styles.itemStyle} key={data.item.index}>
        <Text style={{ fontSize: 18, color: 'black', marginLeft: 20 }}>{data.item.name}</Text>
      </View>
    );
  }

  renderContent() {
    return (
      <View style={styles.container}>
        <SwipeableFlatList
          data={this.state.roomList}
          ref={(ref) => {
            this.swipeableFlatList = ref;
          }}
          renderItem={this._renderItem}
          style={{ width, marginTop: 20, flex: 1 }}
          renderQuickActions={({ item }) => this.getQuickActions(item)} // 创建侧滑菜单
          maxSwipeDistance={80} // 可展开（滑动）的距离
          bounceFirstRowOnMount // 进去的时候不展示侧滑效果
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
