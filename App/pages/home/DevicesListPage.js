import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { TuyaHomeManagerApi, TuyaHomeApi } from '../../../sdk'
import HeadView from '../../common/HeadView';
import BaseComponet from '../../common/BaseComponent';
import SwipeableFlatList from '../../common/SwiperFlatList'

import { storeHomeId } from '../../redux/action';
const { width } = Dimensions.get('window');

class DevicesListPage extends BaseComponet {
  constructor(props) {
    super(props);
    this.state = {
      home: null,
      devList: []
    };
  }
  componentDidMount() {
    this.getData()
    TuyaHomeManagerApi.registerTuyaHomeChangeListener(() => {
      console.warn("add")
      this.getData()
    }, () => {
      console.warn("remove")
      this.getData()
    }, () => { }, () => { }, () => { }, () => { })
  }


  componentWillUnmount() {
    TuyaHomeApi.unRegisterHomeStatusListener({homeId: this.state.home.homeId})
    TuyaHomeManagerApi.onDestroy()
    TuyaHomeManagerApi.unregisterTuyaHomeChangeListener()
  }
  getHomeDetail() {
    TuyaHomeApi.getHomeDetail({ homeId: this.state.home.homeId }).then(data => {
      this.setState(
        {
          devList: data.homeBean.deviceList
        }
      )
    })
    TuyaHomeApi.registerHomeStatusListener({homeId: this.state.home.homeId},()=>{
      this.getHomeDetail()
    },()=>{
      this.getHomeDetail()
    },()=>{},()=>{},()=>{})
  }
  getData() {
    TuyaHomeManagerApi.queryHomeList()
      .then((data) => {
        if (data.length !== 0) {
          this.setState({
            home: data[0],
            devList: []
          }, () => {
            this.getHomeDetail()
          });
          this.props.dispatch(storeHomeId(data[0].homeId));
        } else {
          this.setState({
            home: null,
          })
        }
      })
  }


  componentWillUnmount(){
    TuyaHomeApi.onDestroy({homeId:this.state.home.homeId})
  }
  renderHeaderView() {
    return <HeadView
      leftText={this.state.home ? this.state.home.name : 'create Home'}
      style={{ backgroundColor: 'white', marginBottom: 10 }}
      leftOnPress={() => this.props.navigation.navigate('HomeListPage')}
      rightOnPress={() => {
        if (this.state.home != null) {
          this.props.navigation.navigate('AddDevicePage', {
            homeId: this.state.home.homeId,
          })
        } else {
          this.showToast('you need create home')
        }
      }}
      rightVisable={true}
      rightText={'Add Device'}
    />
  }

  renderContent() {
    return (
      <SwipeableFlatList
        data={this.state.devList}
        ref={(ref) => {
          this.swipeableFlatList = ref
        }}
        bounceFirstRowOnMount={false}
        onEndReachedThreshold={0.1}
        maxSwipeDistance={73 * 1}
        refreshControl={
          <RefreshControl
            onRefresh={() => this.getHomeDetail()}
            refreshing={false}
            tintColor="#ff0000"
            titleColor="#FF2C00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#FFFFFF"
          />
        }
        renderItem={({ item, index }) => <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('DeviceDetailPage', {
            devId: item.devId,
            devInfo: item,
          });
        }}>
          <View style={styles.item}>
          <Image source={{ uri: item.iconUrl }} style={{width:30,height:30,marginLeft:15}}/>
          <Text style={{ color: '#444444', fontSize: 15, marginLeft: 10 }}>{item.name}</Text>
        </View>
        </TouchableOpacity>}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: width - 30,
    marginLeft: 15,
    marginRight: 15,
    height: 92,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default connect(() => ({}))(DevicesListPage);
