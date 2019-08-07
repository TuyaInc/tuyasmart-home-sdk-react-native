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
    if (Platform.OS == 'ios') return
    if (this.state.ActionList.length > 0) {
      TuyaSceneApi.createScene({
          homeId: this.state.homeId,
          name: sceneName,
          stickyOnTop,
          background: sceneBackground,
          matchType: matchType,
          tasks: this.state.ActionList,
          conditionList:this.state.ConditionList
        })
        .then(() => {
          this.setState({
            ActionList: [],
            ConditionList: [],
          });
          this.props.navigation.navigate('HomePage');
        })
        .catch((err) => {
          console.log('-->err', err);
        });
    } else {
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
          {data.item.executorProperty.dpName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            flex: 1,
            marginRight: 15,
          }}
        >
          {`${data.item.executorProperty.value}`}
        </Text>
      </TouchableOpacity>
    );
  }

  _renderConditionItem(data) {
    let text = '';
    if (data.item.type == 'temp') {
      text = data.item.expr.toString();
    } else {
      text = data.item.entitySubIds;
    }
    return (
      <Item
        leftText={data.item.entityName}
        rightText={text}
      />
    );
  }


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