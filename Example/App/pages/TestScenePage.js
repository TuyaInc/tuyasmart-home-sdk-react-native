import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions, BackHandler, TouchableOpacity,
} from 'react-native';
import TuyaShareApi from '../api/TuyaShareApi';
import TuyaHomeManagerApi from '../api/TuyaHomeManagerApi';
import TuyaSceneApi from '../api/TuyaSceneApi';
import DeviceStorage from '../utils/DeviceStorage';
import TuyaTimerApi from '../api/TuyaTimerApi';

const { height, width } = Dimensions.get('window');
export default class TestScenePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homeId: '',
      HomeList: [],
      ActionLists: [],
      ConditionList: [],
      timerList: [],
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop();
      return true;
    });
    DeviceStorage.get('Action')
      .then((data) => {
        console.log('------>Action', data);
        this.setState({
          ActionLists: data,
        });
      })
      .catch((err) => {
        console.log('--->Err', err);
      });
    DeviceStorage.get('Condition')
      .then((data) => {
        console.log('-->device condition', data);
        this.setState({
          ConditionList: data,
        });
      })
      .catch((err) => {
        console.log('--->Err', err);
      });

    TuyaTimerApi.getAllTimerWithDeviceId({ devId: 'vdevo154287002022850' })
      .then((data) => {
        console.log('getAllTimerWithDeviceId--->', data);
        let newArrTimerList = new Array();
        newArrTimerList = data.timer;
        console.log('----->newArrTimerList', newArrTimerList);
        this.setState({
          timerList: newArrTimerList,
        });
      })
      .catch((err) => {
        console.log('--->err');
      });
  }
  // "vdevo154287002022850"

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            // TuyaSceneApi.getTaskDevList({ homeId: 2040920 })
            //   .then(data => {
            //     console.log("getTaskDevList--------",data)
            //   })
            //   .catch(err => {
            //     console.log("getTaskDevList------>err",err)
            //   });

            TuyaSceneApi.getCityByCityIndex({ cityId: 793409505965772800 })
              .then((data) => {
                console.log('getCityByCityIndex--------', data);
              })
              .catch((err) => {
                console.log('getCityByCityIndex------>err', err);
              });
          }}
          style={styles.itemStyle}
        >
          <Text style={{ color: '#000000', fontSize: 18 }}>其他接口测试</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // "lNGv824WcExI74C8"  测试111
            // "fYHWTKU88pmWlaSw"  改
            // "ok9dzWHtyvaMyg9w"  111
            const arr = ['fYHWTKU88pmWlaSw', 'lNGv824WcExI74C8', 'ok9dzWHtyvaMyg9w'];
            // TuyaSceneApi.enableScene({sceneId:"lNGv824WcExI74C8"}).then(data=>{
            //   console.log("--enableScene",data)
            // }).catch(err=>{
            //   console.log("--enableScene",err)
            // })
            // TuyaSceneApi.disableScene({sceneId:"lNGv824WcExI74C8"}).then(data=>{
            //   console.log("--disableScene",data)
            // }).catch(err=>{
            //   console.log("--enableScene",err)
            // })
            TuyaSceneApi.executeScene({ sceneId: 'lNGv824WcExI74C8' })
              .then((data) => {
                console.log('--executeScene', data);
              })
              .catch((err) => {
                console.log('--enableScene', err);
              });
            // TuyaSceneApi.sortSceneList({homeId:2040920,sceneIds:arr}).then(data=>{
            //   console.log("--sortSceneList",data)
            // }).catch(err=>{
            //   console.log("--enableScene",err)
            // })
          }}
          style={styles.itemStyle}
        >
          <Text style={{ color: '#000000', fontSize: 18 }}>场景其他接口题调试</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            TuyaTimerApi.getAllTimerWithDeviceId({ devId: 'vdevo154287002022850' })
              .then((data) => {
                console.log('----getAllTimerWithDeviceId', data);
              })
              .catch((err) => {
                console.log('--->err');
              });
          }}
          style={styles.itemStyle}
        >
          <Text style={{ color: '#000000', fontSize: 18 }}>定时接口测试</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('---->this.state.ActionLists', this.state.ActionLists);
            const ActionLists = this.state.ActionList;
            const devLists = new Array();
            const conditionList = this.state.ConditionList;
            devLists.push('vdevo154287002022850');
            const arr = new Array();
            const placeBean = {
              area: '北京市',
              choose: false,
              city: '北京市',
              cityId: '793409505965772800',
              province: '北京市',
            };

            // 设备传1  设备分为enum bool value 三种
            arr.push({
              type: 'bool',
              rule: false, // 更改值验证
              devId: 'vdevo154287002022850',
              dpId: '1',
              entityType: 1, // 创建天气类型需要 3，设备传1,定时传6
              operator: '==',
              placeBean,
            });
            // 定时 传3
            // arr.push({
            //   placeBean:placeBean,
            //   loop: "0111110",
            //   time: "16:00",
            //   date: "20180310",
            //   display: '周一周二周三周四周五',
            //   name: 'timer',
            //   type:"timer",
            //   timezoneId:"Asia/Shanghai",
            //   entityType: 6, // 创建天气类型需要 3，设备传1,定时传6
            // });
            // TuyaSceneApi.createAutoScene({
            //   homeId: 2040920,
            //   name: '测试1111',
            //   stickyOnTop: false,
            //   devIds: devLists,
            //   background: 'https://images.tuyacn.com/smart/rule/cover/bedroom.png',
            //   matchType: 'MATCH_TYPE_OR',
            //   tasks: this.state.ActionLists,
            //   conditionList: arr,
            // })
            //   .then(data => {
            //     console.log('--->createAutoScene', data);
            //   })
            //   .catch(err => {
            //     console.log('-->err', err);
            //   });
            TuyaSceneApi.modifyAutoScene({
              sceneId: 'fYHWTKU88pmWlaSw',
              homeId: 2040920,
              name: '我再改一次',
              stickyOnTop: false,
              devIds: devLists,
              background: 'https://images.tuyacn.com/smart/rule/cover/bedroom.png',
              matchType: 'MATCH_TYPE_OR',
              tasks: this.state.ActionLists,
              conditionList: arr,
            })
              .then((data) => {
                console.log('--->createAutoScene', data);
              })
              .catch((err) => {
                console.log('-->err', err);
              });
          }}
          style={styles.itemStyle}
        >
          <Text style={{ color: '#000000', fontSize: 18 }}>创建自动化test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // vdevo154287002022850        --5888
            TuyaTimerApi.getTimerWithTask({ devId: 'vdevo154287002022850', taskName: 'timer22' })
              .then((data) => {
                console.log('getTimerWithTask--->', data);
              })
              .catch((err) => {
                console.log('--->err');
              });
            TuyaTimerApi.updateTimerTaskStatusWithTask({
              devId: 'vdevo154287002022850',
              taskName: 'timer22',
              status: 0,
            })
              .then((data) => {
                console.log('updateTimerTaskStatusWithTask--->', data);
              })
              .catch((err) => {
                console.log('--->err');
              });
            // TuyaTimerApi.removeTimerWithTask({
            //   devId: 'vdevo154287002022850',
            //   taskName: 'timer22',
            //   timeId: '0000003y9l',
            // })
            //   .then(data => {
            //     console.log('removeTimerWithTask--->', data);
            //   })
            //   .catch(err => {
            //     console.log('removeTimerWithTask--->err');
            //   });
          }}
          style={styles.itemStyle}
        >
          <Text style={{ color: '#000000', fontSize: 18 }}>定时其他接口调试</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  image: {
    height: 22,
    width: 22,
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
