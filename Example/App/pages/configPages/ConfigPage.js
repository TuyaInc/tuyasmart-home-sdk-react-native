import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions, TextInput, Modal,
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import ViewUtils from '../../utils/ViewUtils';
import TextButton from '../../component/TextButton';
import Strings from '../../i18n/strings';
import TuyaActivatorApi from '../../api/TuyaActivatorApi';
import Ratio from '../../utils/ratio';
import ProgressView from '../../component/ProgressView';

const { height, width } = Dimensions.get('window');
const tips = [Strings.seartDevice, Strings.registerdevice, Strings.initalizingyourdevice];
const Res = {
  progress: require('../../res/images/progress.png'),
};

export default class ConfigPage extends Component {
  constructor(props) {
    super(props);

    console.log('---->this.props', this.props);
    const params = this.props.navigation.state.params;
    this.state = {
      mark: false,
      wifipassword: '',
      ssid: '',
      connecting: false,
      error: false,
      time: 0,
      maxTime: 120,
      progresstime: 1000,
      state: '',
      dev: '',
      homeId: params.homeId,
    };
  }

  renderConnectMark() {
    return (
      <Modal
        animationType="slide"
        transparent
        visible
        onRequestClose={() => {
          this.setState({ mark: false });
        }}
      >
        <View style={styles.marks}>
          <View style={styles.dialog}>
            <Text style={{ fontSize: 16, color: '#303030', marginTop: 24 }}>{Strings.Enter_Wi_Fi_Password}</Text>
            <TextInput
              onChangeText={(value) => {
                this.setState({
                  wifipassword: value,
                });
              }}
              placeholder={Strings.wifipassword}
              placeholderTextColor="#C3C3C9"
              style={styles.passwordInput}
              multiline={false}
              underlineColorAndroid="transparent"
            />
            <View
              style={{
                width: 275,
                marginBottom: 12,
                alignItems: 'flex-start',
              }}
            >
              <Text style={{ color: '#919499', fontSize: 14 }}>
                {'WIFI:'}
                {this.state.ssid == '' ? Strings.connectWifi : this.state.ssid}
              </Text>
              <ButtonX
                text={Strings.Change}
                textStyle={{ color: '#0072BB', fontSize: 14 }}
                onPress={() => {
                  TuyaActivatorApi.openNetworkSettings();
                }}
              />
            </View>
            <View style={styles.bottomBtn}>
              <ButtonX
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.setState({ mark: false })}
              >
                <Text style={{ color: '#22242C', fontSize: 16 }}>{Strings.cancel}</Text>
              </ButtonX>
              <ButtonX
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.connect()}
              >
                <Text style={{ color: '#FF4800', fontSize: 16 }}>{Strings.Confirm}</Text>
              </ButtonX>
            </View>
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              marginTop: 30,
            }}
          >
            {Strings.wifiTips}
          </Text>
        </View>
      </Modal>
    );
  }

  connect() {
    console.warn('----->zzz');
    if (this.state.ssid) {
      this.setState({
        mark: false,
        connecting: true,
        time: 0,
        progresstime: 1000,
        error: false,
      });
      this.stop();
      this.coundDown();
      TuyaActivatorApi.initActivator({
        // 配网
        homeId: this.state.homeId,
        ssid: this.state.ssid,
        password: this.state.wifipassword,
        time: this.state.maxTime,
        type: 'TY_EZ',
      })
        .then((data) => {
          console.log('----->data', data);
          console.warn('PEIWANGCGON');
          this.setState({
            progresstime: 10,
            state: 'success',
            dev: data,
            mark: false,
            connecting: false,
            error: false,
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
          console.log('---config err', error);
          this.refs.toast.show(error.toString().slice(7));
          this.setState({
            progresstime: 10,
            error: true,
            state: '',
            mark: false,
            connecting: false,
          });
        });
    } else {
      this.refs.toast.show('please connect wifi');
    }
  }

  coundDown() {
    this.timer = setTimeout(() => {
      const time = this.state.time + 1;
      if (time > this.state.maxTime) {
        if (this.state.state == 'success') {
          this.refs.toast.show('success');
          // this.props.navigation.navigate("scan", {
          //   dev: this.state.dev,
          //   key: this.props.navigation.state.params.key,
          //   func: devId => {
          //     this.props.navigation.pop();
          //     this.props.navigation.state.params.func(devId);
          //   }
          // });
        }
        return;
      }
      this.setState({ time });
      this.coundDown();
    }, this.state.progresstime);
  }

  stop() {
    this.timer && clearTimeout(this.timer);
    TuyaActivatorApi.stopConfig();
    this.setState({
      state: '',
    });
  }

  renderConnectIng() {
    return (
      <Modal
        animationType="slide"
        transparent
        visible
        onRequestClose={() => {
          this.setState({ connecting: false });
        }}
      >
        <View style={styles.marks}>
          <View style={styles.connectDialog}>
            <Text
              style={{
                fontSize: 16,
                color: '#303030',
                marginTop: Ratio.convertY(24),
              }}
            >
              {Strings.connectnow}
            </Text>

            <View
              style={{
                width: Ratio.convertX(200),
                height: Ratio.convertY(200),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ProgressView progress={this.state.time} maxSize={this.state.maxTime} />
            </View>
            <Text
              style={{
                color: '#4A4A4A',
                fontSize: 14,
                textAlign: 'center',
                marginBottom: 5,
              }}
            >
              {Strings.tips1}
            </Text>
            {tips.map(d => (
              <View key={d} style={styles.progressitem}>
                <Image source={Res.progress} />
                <Text
                  style={{
                    color: '#9B9B9B',
                    fontSize: 12,
                    textAlign: 'center',
                  }}
                >
                  {d}
                </Text>
              </View>
            ))}
            <ButtonX
              text={Strings.cancel}
              textStyle={{ color: 'white', fontSize: 16 }}
              style={{
                backgroundColor: '#FF5800',
                padding: 5,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                marginTop: 10,
                marginBottom: 10,
              }}
              onPress={() => {
                this.setState({ connecting: false });
                this.stop();
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="添加设备"
          style={{ backgroundColor: '#FFFFFF', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
        />
        <Image style={{ width, height: 250 }} source={require('../../res/images/config_bg.png')} />
        <Text style={{ color: '#4A4A4A', fontSize: 18, marginTop: 30 }}>接通电源，确认指示灯在快闪或听到提示音</Text>
        <TextButton
          style={{ marginTop: 150 }}
          onPress={() => {
            this.setState({
              mark: true,
            });
            TuyaActivatorApi.getCurrentWifi(
              (value) => {
                this.setState({ ssid: value });
              },
              () => {
                this.setState({ ssid: '' });
              },
            );
          }}
          disabled={false}
          title="下一步"
        />
        {this.state.mark && this.renderConnectMark()}
        {this.state.connecting && this.renderConnectIng()}
        {this.state.error && this.renderError()}
        <Toast
          ref="toast"
          style={{ backgroundColor: '#7DB428' }}
          position="bottom"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: 'white' }}
        />
      </View>
    );
  }

  renderError() {
    return (
      <Modal
        animationType="slide"
        transparent
        visible
        onRequestClose={() => {
          this.setState({ error: false });
        }}
      >
        <View style={styles.marks}>
          <ButtonX
            text={Strings.cancel}
            textStyle={{ color: 'white', fontSize: 16, left: 0 }}
            style={{ position: 'absolute', left: 16, top: 33 }}
            onPress={() => this.setState({ error: false })}
          />
          <View style={[styles.dialog, {}]}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                // source={require('../res/erroricon.png')}
                style={{ marginTop: 40 }}
              />
              <Text
                style={{
                  color: '#303030',
                  fontSize: 16,
                  marginTop: 24,
                  marginBottom: 24,
                  marginLeft: 12,
                  marginRight: 12,
                  textAlign: 'center',
                }}
              >
                {Strings.error}
              </Text>
            </View>
            <View
              style={{
                width: 311,
                flexDirection: 'row',
                height: 56,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopColor: '#DBDBDB',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              {/* <ButtonX
                text={'Understand the details'}
                textStyle={{ color: '#303030', fontSize: 18 }}
                style={{
                  height: 56,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopWidth: 1,
                  borderTopColor: '#DBDBDB'
                }}
                onPress={() =>
                  this.setState({
                    error: false
                  })}
              />
              <View
                style={{ width: 1, height: 56, backgroundColor: '#DBDBDB' }}
              /> */}
              <ButtonX
                text="I got it!"
                textStyle={{ color: '#FF5800', fontSize: 18 }}
                style={{
                  height: 56,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopWidth: 1,
                  borderTopColor: '#DBDBDB',
                }}
                onPress={() => this.setState({
                  error: false,
                })
                }
              />
            </View>
          </View>
        </View>
      </Modal>
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
