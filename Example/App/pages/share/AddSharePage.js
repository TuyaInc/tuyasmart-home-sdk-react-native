import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import ViewUtils from '../../utils/ViewUtils';
import TuyaShareApi from '../../api/TuyaShareApi';

const { height, width } = Dimensions.get('window');

const Res = {
  arrowRight: require('../../res/images/Arrow_right.png'),
};

export default class AddSharePage extends Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    const devIdList = new Array();
    console.log('--->params', params.devId);
    devIdList.push(params.devId);
    this.state = {
      homeId: params.homeId,
      shareList: [],
      userName: '',
      devIds: devIdList,
    };
  }

  componentDidMount() {}

  _renderRightBtn(name) {
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.state.userName.length > 0) {
            TuyaShareApi.addShareWithHomeId({
              homeId: this.state.homeId,
              countryCode: '86',
              userAccount: this.state.userName,
              devIds: this.state.devIds,
            })
              .then((data) => {
                console.log('-->data', data);
                this.refs.toast.show('添加成功了');
                this.props.navigation.pop();
              })
              .catch((err) => {
                console.log('--->Err', err);
              });
          }
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: 'black',
            marginRight: 15,
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{ backgroundColor: '#FFFFFF', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          rightButton={this._renderRightBtn('完成', this.props)}
          title="添加共享"
        />

        <TouchableOpacity
          style={[styles.itemStyle]}
          onPress={() => {
            this.setState({ editVisible: true });
          }}
        >
          <Text style={{ color: 'black', fontSize: 16 }}>国家/地区</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ marginRight: 10 }}>中国+86</Text>
            <Image source={Res.arrowRight} />
          </View>
        </TouchableOpacity>
        <View style={[styles.itemStyle]}>
          <Text style={{ color: 'black', fontSize: 16 }}>国家/地区</Text>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(value) => {
              this.setState({
                userName: value,
              });
            }}
            placeholder="输入被分享账户"
            placeholderTextColor="#C3C3C9"
            style={styles.textInputStyle}
            multiline={false}
            underlineColorAndroid="transparent"
          />
        </View>
        <Toast
          ref="toast"
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
    width,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
  },
  textInputStyle: {
    fontSize: 18,
    color: 'black',
    width: width * 0.8,
    borderColor: 'gray',
    height: 56,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
