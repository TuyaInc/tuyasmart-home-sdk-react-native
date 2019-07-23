import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  SwipeableFlatList,
  DeviceEventEmitter,
  Platform
} from 'react-native';
import { TuyaSceneApi } from '../../../sdk';
import Item from '../../common/Item'

import DeviceStorage from '../../utils/DeviceStorage';
import HeadView from '../../common/HeadView'
import BaseComponent from '../../common/BaseComponent'
import { messageCondition, messageTask, sceneName, sceneBackground, matchType, stickyOnTop } from '../../constant'

import { connect } from 'react-redux'

const { width } = Dimensions.get('window');
const Res = {
  scenebg: require('../../res/images/scenebg.png'),
  redAdd: require('../../res/images/red_add.png'),
  picTake: require('../../res/images/pic_take.png'),
  pen: require('../../res/images/pen.png'),
  cloud: require('../../res/images/cloud.png'),
  humidity: require('../../res/images/humidity.png'),
  sunsetrise: require('../../res/images/sunsetrise.png'),
};
class AddAutoPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ActionList: [],
      ConditionList: [],
      homeId: this.props.homeId
    };
  }
  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener(messageTask, (data) => {
      const list = this.state.ActionList
      list.push(data)
      this.setState({
        ActionList: list.concat()
      })
    });
    this.listener = DeviceEventEmitter.addListener(messageCondition, (data) => {
      const list = this.state.ConditionList
      list.push(data)
      this.setState({
        ConditionList: list.concat()
      })
    });
  }
  componentWillUnmount() {
    this.listener && this.listener.remove();
    this.listener1 && this.listener.remove();
  }

  _save() {
    if(Platform.OS=='ios')return
    if (this.state.ActionList.length > 0) {
      const ActionLists = this.state.ActionList;
      const conditionPromise = new Array();
      const devLists = new Array();
      for (let i = 0, j = ActionLists.length; i < j; i++) {
        devLists.push(ActionLists[i].devId);
      }
      for (let i = 0, j = this.state.ConditionList.length; i < j; i++) {
        conditionPromise.push(TuyaSceneApi.createWeatherCondition(this.state.ConditionList[i]));
      }
      Promise.all(conditionPromise).then((data) => {
        TuyaSceneApi.createAutoScene({
          homeId: this.state.homeId,
          name: sceneName,
          stickyOnTop,
          devIds: devLists,
          background: sceneBackground,
          matchType,
          tasks: ActionLists,
          conditionList: data,
        })
          .then(() => {
            DeviceStorage.delete('Action');
            DeviceStorage.delete('Condition');
            this.setState({
              ActionList: [],
              ConditionList: [],
            });
            this.props.navigation.navigate('HomePage');
          })
          .catch((err) => {
            console.log('-->err', err);
          });
      })

    } else {
      // 未添加动作
    }
  }



  _renderConditionFooter() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('ConditionListPage');
        }}
      >
        <View
          style={{
            width,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#A2A3AA', fontSize: 13 }}>Adding Execution Conditions</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderItem(data) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemStyle}
        onPress={() => {
          console.log('--->data.item', data.item);
        }}
      >
        <Image style={{ height: 35, width: 35 }} source={Res.picTake} />
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            flex: 1,
            marginLeft: 50,
          }}
        >
          {data.item.dpName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            flex: 1,
            marginRight: 15,
          }}
        >
          {`${data.item.value}`}
        </Text>
      </TouchableOpacity>
    );
  }

  _renderConditionItem(data) {
    let text = '';
    if (data.item.type == 'temp') {
      text = `${data.item.range} ` + ':' + ` ${data.item.value}`;
    } else {
      text = data.item.value;
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemConditionStyle}
      >
        <Image style={{ height: 20, width: 20, resizeMode: 'stretch' }} source={Res.cloud} />
        <View
          style={{
            flex: 1,
            width: 60,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              flex: 1,
            }}
          >
            {data.item.localCity}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              flex: 1,
            }}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  // 侧滑菜单渲染
  getQuickActions = (item, isCondition) => (
    <View style={styles.quickAContent}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (!isCondition) {
            const newArr = new Array();
            const data = this.state.ActionList;
            for (let i = 0, j = data.length; i < j; i++) {
              if (data[i].dpId !== item.dpId) {
                newArr.push(data[i]);
              }
            }
            this.setState({
              ActionList: newArr,
            });
          } else {
            const data = this.state.ConditionList;
            data.splice(data.indexOf(item), 1)
            this.setState({
              ConditionList: data
            })
          }
        }}
      >
        <View style={styles.quick}>
          <Text style={styles.delete}>{'delete'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  renderHeaderView() {
    return <HeadView
      leftOnPress={() => { this.props.navigation.pop() }}
      rightOnPress={() => this._save()}
      rightVisable={true}
      rightText={'save'}
    />
  }
  renderContent() {
    return (
      <View
        style={{
          backgroundColor: '#F4F4F5',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flex: 1,
        }}
      >
        <View
          style={{
            width: 0.95 * width,
            backgroundColor: '#FFFFFF',
            marginTop: 30,
            flexDirection: 'column',
          }}
        >
          <Image source={Res.scenebg} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <Text style={{ color: '#22242C', fontSize: 14 }}>When one of the following conditions is satisfied</Text>
            <TouchableOpacity
              style={styles.addStyle}
              onPress={() => {
                this.props.navigation.navigate('ConditionListPage');
              }}
            >
              <Text style={{ fontSize: 16, color: '#FFFFFF' }}>+</Text>
            </TouchableOpacity>
          </View>
          <SwipeableFlatList
            data={this.state.ConditionList}
            ref={(ref) => {
              this._flatListRef = ref;
            }}
            renderItem={this._renderConditionItem}
            style={{ width }}
            renderQuickActions={({ item }) => this.getQuickActions(item, true)} // 创建侧滑菜单
            maxSwipeDistance={80} // 可展开（滑动）的距离
            bounceFirstRowOnMount // 进去的时候不展示侧滑效果
            ListEmptyComponent={this._renderConditionFooter(this.props)}
          />
        </View>
        <View
          style={{
            width: 0.95 * width,
            backgroundColor: '#FFFFFF',
            marginTop: 30,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
              width: 0.95 * width,
            }}
          >
            <Text style={{ color: '#22242C', fontSize: 14 }}>就执行以下动作</Text>
            <TouchableOpacity
              style={styles.addStyle}
              onPress={() => {
                this.props.navigation.navigate('AddActionPage', {
                  isFromScene: false,
                });
              }}
            >
              <Text style={{ fontSize: 16, color: '#FFFFFF' }}>+</Text>
            </TouchableOpacity>
          </View>
          <SwipeableFlatList
            data={this.state.ActionList}
            ref={(ref) => {
              this._flatListRef = ref;
            }}
            renderItem={this._renderItem}
            style={{ width }}
            renderQuickActions={({ item }) => this.getQuickActions(item)} // 创建侧滑菜单
            maxSwipeDistance={80} // 可展开（滑动）的距离
            bounceFirstRowOnMount // 进去的时候不展示侧滑效果
            ListEmptyComponent={() => <Item
              onPress={() => {
                this.props.navigation.navigate('AddActionPage', {
                  isFromScene: false,
                });
              }}
              leftText={'Add execution actions'} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  delete: {
    color: '#d8fffa',
  },
  quickAContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
    height: 58,
  },
  quick: {
    backgroundColor: 'red',
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
  itemConditionStyle: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 1,
    marginLeft: 8,
    marginRight: 8,
    width,
    backgroundColor: '#FFFFFF',
  },
  addStyle: {
    backgroundColor: 'red',
    borderRadius: 20,
    height: 22,
    width: 22,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default connect((state) => ({
  homeId: state.reducers.homeId,
}))(AddAutoPage)