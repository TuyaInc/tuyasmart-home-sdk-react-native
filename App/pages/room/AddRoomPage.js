import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
  DeviceEventEmitter,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';
import ButtonX from '../../standard/components/buttonX';
import TuyaHomeApi from '../../api/TuyaHomeApi';

const { height, width } = Dimensions.get('window');

export default class AddRoomPage extends Component {
  constructor(props) {
    super(props);

    const params = this.props.navigation.state.params;
    this.state = {
      userName: '',
      homeId: params.homeId,
    };
  }

  renderRightButton(name) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.warn('--->this.stat', this.state.userName);
          if (this.state.userName.length != 0) {
            TuyaHomeApi.addRoom({
              homeId: this.state.homeId,
              name: this.state.userName,
            })
              .then((data) => {
                DeviceEventEmitter.emit('refresh');
                this.props.navigation.pop();
              })
              .catch((err) => {
                console.warn('addRoom-->Err', err);
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
          title="添加房间"
          style={{ backgroundColor: '#FFFFFF', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          rightButton={this.renderRightButton('保存')}
        />
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            marginTop: 20,
          }}
        >
          <TextInput
            onChangeText={(value) => {
              this.setState({
                userName: value,
              });
            }}
            placeholder="输入房间名称"
            placeholderTextColor="#C3C3C9"
            style={styles.textInputStyle}
            multiline={false}
            underlineColorAndroid="transparent"
          />
        </View>
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
  },
  tips: {
    fontSize: 29,
  },
  textInputStyle: {
    fontSize: 18,
    color: 'black',
    width,
    borderColor: 'gray',
    height: 56,
    backgroundColor: 'white',
  },
});
