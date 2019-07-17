import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../utils/ViewUtils';
import TuyaDeviceApi from '../api/TuyaDeviceApi';
import { resetAction } from '../navigations/AppNavigator';
import EditDialog from '../component/EditDialog';

const { height, width } = Dimensions.get('window');

const Res = {
  arrowRight: require('../res/images/Arrow_right.png'),
};

class DeviceSettingPage extends Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;

    this.state = {
      devId: params.devId,
      devInfo: params.devInfo,
      devName: params.devInfo.name,
      editVisible: false,
      nameValue: '',
      homeId: this.props.reducers.homeId,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{ backgroundColor: '#F4F4F5', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          title="设备设置"
        />
        <Text style={styles.tips}>基本信息</Text>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => {
            this.setState({ editVisible: true });
          }}
        >
          <Text>设备名称</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ marginRight: 10 }}>{this.state.devName}</Text>
            <Image source={Res.arrowRight} />
          </View>
        </TouchableOpacity>
        <Text style={styles.tips}>其他</Text>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => {
            this.props.navigation.navigate('SharePage', {
              homeId: this.state.homeId,
              devId: this.state.devId,
            });
          }}
        >
          <Text>共享设备</Text>
          <Image source={Res.arrowRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => {
            this.props.navigation.navigate('GroupPage', {
              homeId: this.state.homeId,
              devId: this.state.devId,
              productId: this.state.devInfo.productId,
            });
          }}
        >
          <Text>创建群组</Text>
          <Image source={Res.arrowRight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemStyle}>
          <Text>设备信息</Text>
          <Image source={Res.arrowRight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemStyle}>
          <Text>意见反馈</Text>
          <Image source={Res.arrowRight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemStyle2} onPress={() => {}}>
          <Text>移除设备</Text>
        </TouchableOpacity>
        <EditDialog
          title="编辑名称"
          visible={this.state.editVisible}
          textValue={(value) => {
            this.setState({
              nameValue: value,
            });
          }}
          save={() => {
            TuyaDeviceApi.renameDevice({
              devId: this.state.devId,
              name: this.state.nameValue,
            })
              .then((data) => {
                console.log('--->data', data);
                this.setState({
                  devName: this.state.nameValue,
                  editVisible: false,
                });
              })
              .catch((err) => {
                console.warn('-->err', err);
              });
          }}
          cancel={() => {
            this.setState({
              editVisible: false,
            });
          }}
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
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
  tips: {
    color: '#81828B',
    fontSize: 13,
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  itemStyle: {
    width,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
  },
  itemStyle2: {
    width,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 80,
  },
});
export default connect(state => ({
  ...state,
}))(DeviceSettingPage);
