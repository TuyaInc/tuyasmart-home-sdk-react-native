import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions, BackHandler,
} from 'react-native';
import TuyaShareApi from '../api/TuyaShareApi';
import TuyaHomeManagerApi from '../api/TuyaHomeManagerApi';

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

    // 2040920
    // TuyaHomeManagerApi.queryHomeList()
    //   .then(data => {
    //     console.log('Test--->queryHomeList', data);
    //     if (data.length !== 0) {
    //       this.setState({
    //         HomeList: data,
    //         homeId: data[0].homeId,
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     console.warn('--->err', err);
    //   });

    TuyaShareApi.queryUserShareList({ homeId: 2040920 })
      .then((data) => {
        console.log('queryUserShareList---->', data);
      })
      .catch((err) => {
        console.log('1 err----->', err);
      });
    // TuyaShareApi.queryShareReceivedUserList()
    //   .then(data => {
    //     console.log('queryShareReceivedUserList---->', data);
    //   })
    //   .catch(err => {
    //     console.log('queryShareReceivedUserList err----->', err);
    //   });
    // /*查询指定设备的分享用户列表*/
    // TuyaShareApi.queryDevShareUserList({ devId: 'vdevo154287002022850' })
    //   .then(data => {
    //     console.log('queryDevShareUserList--->', data);
    //   })
    //   .catch(err => {
    //     console.log('queryDevShareUserList err----->', err);
    //   });
    // /* 查询指定设备是谁共享的 */
    // TuyaShareApi.queryShareDevFromInfo({ devId: "vdevo154781353631774" })
    //   .then(data => {
    //     console.log('queryShareDevFromInfo---->', data);
    //   })
    //   .catch(err => {
    //     console.log('queryShareDevFromInfo err----->', err);
    //   });
    // /* 查询分享到指定用户的共享关系 */
    TuyaShareApi.getUserShareInfo({ memberId: 4283491 })
      .then((data) => {
        console.log('getUserShareInfo---->', data);
      })
      .catch((err) => {
        console.log('getUserShareInfo err----->', err);
      });
    // /*查询收到指定用户共享的信息*/
    // TuyaShareApi.getReceivedShareInfo({ memberId: 3679305 })
    //   .then(data => {
    //     console.log('getReceivedShareInfo---->', data);
    //   })
    //   .catch(err => {
    //     console.log('getReceivedShareInfo err----->', err);
    //   });
    //           /*移除收到的分享设备*/
    //       TuyaShareApi.removeReceivedUserShare({memberId: 3679305}).then(data=>{
    //         console.log('removeReceivedUserShare---->',data)
    //       }).catch(err=>{
    //         console.log("removeReceivedUserShare err----->",err)
    //       })
    //          /*单个设备取消共享*/
    //       TuyaShareApi.disableDevShare({memberId: 3679305,devId:"vdevo154781353631774"}).then(data=>{
    //         console.log('disableDevShare---->',data)
    //       }).catch(err=>{
    //         console.log("disableDevShare err----->",err)
    //       })
    //          /*移除收到的分享设备*/
    // TuyaShareApi.removeReceivedDevShare({devId:"vdevo154781353631774"}).then(data=>{
    //   console.log('removeReceivedDevShare---->',data)
    // }).catch(err=>{
    //   console.log("removeReceivedDevShare err----->",err)
    // })
    /* 修改发出的分享人的备注名 */
    // TuyaShareApi.renameShareNickname({ memberId: 3679305, name: 'aaaa' })
    //   .then(data => {
    //     console.log('renameShareNickname---->', data);
    //   })
    //   .catch(err => {
    //     console.log('renameShareNickname err----->', err);
    //   });
    // //     /*修改接收到的分享人的备注名*/
    // TuyaShareApi.renameReceivedShareNickname({ memberId: 3679305, name: 'zzzzz' })
    //   .then(data => {
    //     console.log('renameReceivedShareNickname--->', data);
    //   })
    //   .catch(err => {
    //     console.log('renameReceivedShareNickname err----->', err);
    //   });
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
