import React from 'react';
import {
  View, StyleSheet, Text, Image, Dimensions,
} from 'react-native';
import { TuyaActivatorApi } from '../../../sdk'
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';
import TextButton from '../../component/TextButton';
import Ratio from '../../utils/ratio';
import BaseComponent from '../../component/BaseComponet'
const { height, width } = Dimensions.get('window');

export default class ConfigPage extends BaseComponent {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      //wifiName
      ssid: 'Tuya',
      wifipassword: 'Tuya.140616',
      //overtime
      maxTime: 120,
      homeId: params.homeId,
    };
  }


  connect() {
    console.log('connect')
    this.startLoading()
    TuyaActivatorApi.initActivator({
      // 配网
      homeId: this.state.homeId,
      ssid: this.state.ssid,
      password: this.state.wifipassword,
      time: this.state.maxTime,
      type: 'TY_EZ',
    })
      .then((data) => {
        this.stopLoading()
        console.log('config success');
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
        console.log(error)
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
        <Text style={{ color: '#4A4A4A', fontSize: 18, marginTop: 30 }}>Turn on the power supply and confirm that the indicator is flashing or hearing the prompt sound.</Text>
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
  tips: {
    fontSize: 29,
  },
  textStyle: {
    fontSize: 18,
    color: '#868582',
    marginLeft: Ratio.convertX(17),
    marginRight: Ratio.convertX(17),
    textAlign: 'center',
    marginTop: Ratio.convertY(20),
  },
  btnX: {
    height: Ratio.convertY(38),
    width: Ratio.convertX(341),
    backgroundColor: '#7DB428',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Ratio.convertX(60),
  },
  image: {
    width: Ratio.convertX(262),
    height: Ratio.convertY(192),
    resizeMode: 'stretch',
    marginTop: Ratio.convertY(100),
  },
  passwordInput: {
    width: Ratio.convertX(275),
    marginTop: Ratio.convertY(1),
    borderColor: '#D3D3D3',
    borderWidth: 2,
    backgroundColor: '#F8F8F8',
    height: Ratio.convertY(48),
    marginLeft: Ratio.convertX(17),
    marginRight: Ratio.convertX(17),
    paddingLeft: Ratio.convertX(17),
    marginTop: Ratio.convertY(24),
    marginBottom: Ratio.convertY(12),
  },
  bottomBtn: {
    width: Ratio.convertX(311),
    height: Ratio.convertY(56),
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marks: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    width: Ratio.convertX(311),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  connectDialog: {
    width: Ratio.convertX(311),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  progressitem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    width: Ratio.convertX(200),
    marginTop: Ratio.convertY(2),
    marginBottom: Ratio.convertY(2),
  },
});
