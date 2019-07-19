import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {TuyaHomeApi,TuyaHomeDataManagerApi} from '../../../sdk'


const { width } = Dimensions.get('window');

export default class DevicesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceList: [],
      groupList: [],
      meshList: [],
      sharedDeviceList: [],
      sharedGroupList: [],
      refreshing:false
    };
  }

  loadData() {
    if (this.props.isRoom) {
      TuyaHomeDataManagerApi.getRoomDeviceList({
        roomId: this.props.id,
      })
        .then((data) => {
          console.log(data)
          this.setState({refreshing:false})
        })
        .catch((err) => {
          this.setState({refreshing:false})
        });
    } else {
      console.log('------>,homeId', this.props.id),
      TuyaHomeApi.getHomeDetail({
        homeId: this.props.id,
      })
        .then((data) => {
          console.log('------>getHomeDetail', data),
          this.setState({
            deviceList: data.deviceList,
            groupList: data.groupList,
            meshList: data.meshList,
            sharedDeviceList: data.sharedDeviceList,
            sharedGroupList: data.sharedGroupList,
            refreshing:false
          });
        })
        .catch((err) => { this.setState({refreshing:false})});
    }
  }

  componentDidMount() {
    this.loadData();
  }

  _renderEmpty() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{alignItems:'center'}}> 
        <Image style={{ marginTop: 80 }} source={require('../../res/images/empty_bg.png')} />
        <Text style={{ marginTop: 10, fontSize: 13, color: '#A2A3AA' }}>No equipment, Please add</Text>
        </View>
        <TouchableOpacity
          style={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#A2A3AA',
            width: 120,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}
          onPress={() => {
            this.props.navigation.navigate('ConfigPage', {
              homeId: this.props.id,
            });
          }}
        >
          <Text style={{ fontSize: 13, color: '#A2A3AA' }}>add device</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.deviceList}
          ref={(ref) => {
            this._flatListRef = ref;
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                console.log('--devInfo', item);
                this.props.navigation.navigate('DeviceDetailPage', {
                  devId: item.devId,
                  devInfo: item,
                  schema:
                      Platform.OS === 'ios' ? JSON.parse(item.schema) : JSON.parse(item.productBean.schemaInfo.schema),
                });
              }}
            >
              <View
                style={{
                  width: 0.9 * width,
                  height: 92,
                  borderRadius: 6,
                  backgroundColor: '#FFFFFF',
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Image style={{ marginLeft: 10 }} source={require('../../res/images/pic_take.png')} />
                <Text style={{ color: '#444444', fontSize: 15, marginLeft: 10 }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={{ flex: 1 }}
          ListEmptyComponent={this._renderEmpty(this.props)}
          refreshControl={(
            <RefreshControl
              onRefresh={() => {this.loadData()}}
              refreshing={this.state.refreshing}
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
    alignItems: 'center',
  },
  tips: {
    fontSize: 29,
  },
});
