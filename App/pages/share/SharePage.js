import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions, FlatList, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import ViewUtils from '../../utils/ViewUtils';
import TuyaShareApi from '../../api/TuyaShareApi';

const { height, width } = Dimensions.get('window');

class SharePage extends Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    console.log('share params', params);
    this.state = {
      homeId: params.homeId,
      shareList: [],
      devId: params.devId,
    };
  }

  componentDidMount() {
    TuyaShareApi.queryUserShareList({ homeId: this.state.homeId })
      .then((data) => {
        this.setState({
          shareList: data,
        });
      })
      .catch((err) => {
        console.warn('-->err', err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{ backgroundColor: '#FFFFFF', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          // rightButton={this._renderRightBtn()}
          title="共享设备"
        />
        <Text
          style={{
            color: '#22232C',
            fontSize: 13,
            marginLeft: 10,
            marginTop: 8,
          }}
        >
          设备以单独共享给这些用户
        </Text>
        <FlatList
          data={this.state.shareList}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <View style={styles.itemStyle}>
              <Image
                style={{ height: 48, width: 48, resizeMode: 'stretch' }}
                source={item.iconUrl.length > 0 ? { uri: item.iconUrl } : require('../../res/images/headPic.png')}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#22242C', fontSize: 16, marginLeft: 10 }}>{item.remarkName}</Text>
                <Text style={{ color: '#A2A3AA', fontSize: 13, marginLeft: 10 }}>{item.userName}</Text>
              </View>
            </View>
          )}
        />

        <TouchableOpacity
          style={{
            width,
            height: 60,
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            this.props.navigation.navigate('AddSharePage', {
              homeId: this.state.homeId,
              devId: this.state.devId,
            });
          }}
        >
          <Text style={{ fontSize: 16, color: '#FF4800', fontWeight: 'bold' }}>添加共享</Text>
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
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
  tips: {
    fontSize: 29,
  },
  itemStyle: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 1,
    marginLeft: 8,
    marginRight: 8,
    width,
    backgroundColor: '#FFFFFF',
  },
});

export default connect(state => ({
  ...state,
}))(SharePage);
