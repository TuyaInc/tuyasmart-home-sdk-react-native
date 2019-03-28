import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions, BackHandler,
} from 'react-native';
import TuyaShareApi from '../api/TuyaShareApi';
import TuyaHomeManagerApi from '../api/TuyaHomeManagerApi';
import TuyaSceneApi from '../api/TuyaSceneApi';
import TuyaGroupApi from '../api/TuyaGroupApi';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homeId: '',
      HomeList: [],
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop();
      return true;
    });

    TuyaGroupApi.queryDeviceListToAddGroup({ homeId: 2040920, productId: 'zWpmiNWIMKJNHOUq' })
      .then((data) => {
        console.log('-------->', data);
      })
      .catch((err) => {
        console.log('----->err', err);
      });
    // TuyaGroupApi.dismissGroup({homeId:2040920,productId:"QT6JfV8IBFHnwQ6v"}).then(data=>{
    //   console.log('dismissGroup------->',data)
    //  }).catch(err=>{
    //   console.log("dismissGroup----->err",err)
    //  })
    // TuyaGroupApi.updateGroupName({ groupId: 2442029, name: '我改名字了' })
    //   .then(data => {
    //     console.log('updateGroupName-------->', data);
    //   })
    //   .catch(err => {
    //     console.log('updateGroupName----->err', err);
    //   });
    // TuyaGroupApi.registerGroupListener(
    //   { groupId: 2442029 },
    //   data => {
    //     console.log('registerGroupListener onDpUpdate--', data);
    //   },
    //   data => {
    //     console.log('registerGroupListener onGroupInfoUpdate--', data);
    //   },
    //   data => {
    //     console.log('registerGroupListener onGroupRemoved--', data);
    //   },
    // );
    // TuyaGroupApi.unregisterGroupListener({ groupId: 2442029})
    // .then(data => {
    //   console.log('unregisterGroupListener-------->', data);
    // })
    // .catch(err => {
    //   console.log('unregisterGroupListener----->err', err);
    // });

    // TuyaGroupApi.publishDps({ groupId: 2442029,{"1":true}})
    // .then(data => {
    //   console.log('publishDps-------->', data);
    // })
    // .catch(err => {
    //   console.log('publishDps----->err', err);
    // });
  }

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    height: 22,
    width: 22,
  },
});
