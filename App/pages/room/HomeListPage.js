import React from 'react';
import { TuyaHomeManagerApi, TuyaHomeApi } from '../../../sdk'
import { RefreshControl, TouchableOpacity, Text } from 'react-native'

import BaseComponet from '../../common/BaseComponent';
import HeadView from '../../common/HeadView';
import Item from '../../common/Item'
import SwipeableFlatList from '../../common/SwiperFlatList'

export default class HomeListPage extends BaseComponet {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
    this.getHomeList()
  }
  getHomeList() {
    TuyaHomeManagerApi.queryHomeList().then(data => {
      this.setState({
        data,
      })
    })
  }

  renderHeaderView() {
    return <HeadView
      leftOnPress={() => { this.props.navigation.pop() }}
      rightVisable={true}
      centerText={'Home List'}
      rightText={'Create Home'}
      rightOnPress={() => {
        this.props.navigation.navigate('CreateHomePage', {
          success: () => this.getHomeList()
        })
      }}
    />
  }


  getQuickActions = item => <TouchableOpacity
    style={[
      { justifyContent: 'center', height: 50, width: 73, alignItems: 'center', backgroundColor: '#4F41EE', alignSelf: 'flex-end' },
    ]}
    onPress={() => {
      this.swipeableFlatList && this.swipeableFlatList._onClose()
      TuyaHomeApi.dismissHome({ homeId: item.item.homeId }).then(() => this.getHomeList())
    }}
  >
    <Text style={{ color: 'white', padding: 4, fontSize: 12, textAlign: 'center' }}>{'delete'}</Text>
  </TouchableOpacity>

  renderContent() {
    return <SwipeableFlatList
      data={this.state.data}
      ref={(ref) => {
        this.swipeableFlatList = ref
      }}
      bounceFirstRowOnMount={false}
      onEndReachedThreshold={0.1}
      renderQuickActions={item => this.getQuickActions(item)}
      maxSwipeDistance={73 * 1}
      refreshControl={
        <RefreshControl
          onRefresh={() => this.getHomeList()}
          refreshing={false}
          tintColor="#ff0000"
          titleColor="#FF2C00"
          colors={['#ff0000', '#00ff00', '#0000ff']}
          progressBackgroundColor="#FFFFFF"
        />
      }
      renderItem={({ item, index }) => <Item leftText={item.name} onPress={() => this.props.navigation.navigate('RoomSettingPage', { homeId: item.homeId })} />}
    />
  }
}


