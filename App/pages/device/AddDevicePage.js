import React from 'react';
import {
  View, StyleSheet, Text, Image, Dimensions,
  ScrollView

} from 'react-native';
import { TuyaActivatorApi } from '../../../sdk'
import ButtonX from '../../common/ButtonX';
import HeadView from '../../common/HeadView';
import EditItem from '../../common/EditItem'
import Item from '../../common/Item'
import PickeWheelX from '../../common/PickeWheelX'

import BaseComponent from '../../common/BaseComponent'
import { ssid, wifiPassWord, wifiTimeOut, wifiType } from '../../constant'
const { width } = Dimensions.get('window');

export default class AddDevicePage extends BaseComponent {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      homeId: params.homeId,
      ssid,
      password: wifiPassWord,
      time: wifiTimeOut,
      type: wifiType
    };
    TuyaActivatorApi.getCurrentSSID().then(ssid => {
      if (ssid) {
        this.setState({
          ssid
        })
      }
    })
  }


  connect() {
    const { homeId, ssid, password, time, type } = this.state
    if (!homeId || !ssid || !password || !time || !type) return
    this.showToast('start wifi network configuration')
    this.startLoading()
    TuyaActivatorApi.initActivator({
      homeId,
      ssid,
      password,
      time,
      type,
    })
      .then(() => {
        this.showToast('success ')
        this.props.navigation.pop()
        this.stop();
      })
      .catch((error) => {
        this.stop();
        this.showToast(error.toString())
      });
  }


  componentWillUnmount() {
    this.stop()
  }
  stop() {
    TuyaActivatorApi.stop();
    this.stopLoading()
  }
  renderHeaderView() {
    return <HeadView
      centerText="add device"
      leftOnPress={() => this.props.navigation.pop()}
    />
  }

  renderContent() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={{ width, height: 250 }} source={require('../../res/images/config_bg.png')} />
          <Text style={{ color: '#4A4A4A', fontSize: 18, marginTop: 30, padding: 5 }}>Turn on the power supply and confirm that the indicator is flashing or hearing the prompt sound.</Text>
          <EditItem leftText={'ssid'} value={this.state.ssid} onChangeText={(ssid) => {
            this.setState({
              ssid
            })
          }} />
          <EditItem leftText={'password'} value={this.state.password} onChangeText={(password) => {
            this.setState({
              password
            })
          }} />
          <Item leftText={'TYPE'} rightText={this.state.type} onPress={() => {
            const list = ['TY_AP', 'TY_EZ','TY_QR']
            this.pickeWheelX &&
              this.pickeWheelX.show(list.indexOf(this.state.type), list, (index) => {
                 this.setState({
                   type:list[index]
                 })
              })
          }} />
          <ButtonX
            style={styles.btnStyle}
            textStyle={{color:'white'}}
            onPress={() => {
              this.connect()
            }}
            disabled={false}
            text="Next"
            
          />
        </View>
      </ScrollView>
    );
  }
  renderExpendView() {
    return <View>
      <PickeWheelX
        ref={(ref) => {
          this.pickeWheelX = ref
        }}
      />
    </View>
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
  btnStyle: {
    width: 0.85 * width,
    height: 48,
    backgroundColor: '#FF4800',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 4,
    marginTop:50
  },
});
