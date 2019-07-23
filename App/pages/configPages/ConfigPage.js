import React from 'react';
import {
  View, StyleSheet, Text, Image, Dimensions,
} from 'react-native';
import { TuyaActivatorApi } from '../../../sdk'
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';
import TextButton from '../../component/TextButton';
import Ratio from '../../utils/ratio';
import BaseComponent from '../../common/BaseComponent'
import {ssid,wifiPassWord,wifiTimeOut,wifiType} from '../../constant'
const { height, width } = Dimensions.get('window');

export default class ConfigPage extends BaseComponent {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      homeId: params.homeId,
    };
  }


  connect() {
    this.startLoading()
    TuyaActivatorApi.initActivator({
      homeId: this.state.homeId,
      ssid: ssid,
      password:wifiPassWord,
      time: wifiTimeOut,
      type: wifiType,
    })
      .then((data) => {
        this.stopLoading()
        this.setState({
          dev: data,
        });
        this.props.navigation.navigate('scan', {
          dev: this.state.dev,
          key: this.props.navigation.state.params.key,
          func: (devId) => {
            this.props.navigation.pop();
            this.props.navigation.state.params.func(devId);
          },
        });
        this.stop();
      })
      .catch((error) => {
        this.stopLoading()
        this.showToast(error.toString())
      });
  }


  componentWillUnmount(){
    this.stopLoading()
  }
  stop() {
    TuyaActivatorApi.stopConfig();
  }
  renderHeaderView() {
    return <NavigationBar
      title="add device"
      style={{ backgroundColor: '#FFFFFF', width }}
      leftButton={ViewUtils.getLeftButton(() => {
        this.props.navigation.pop();
      })}
    />
  }

  renderContent() {
    return (
      <View style={styles.container}>
        <Image style={{ width, height: 250 }} source={require('../../res/images/config_bg.png')} />
        <Text style={{ color: '#4A4A4A', fontSize: 18, marginTop: 30,padding:5 }}>Turn on the power supply and confirm that the indicator is flashing or hearing the prompt sound.</Text>
        <TextButton
          style={{ marginTop: 150 }}
          onPress={() => {
            this.connect()
          }}
          disabled={false}
          title="下一步"
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
    backgroundColor: '#FFFFFF',
  },
});
