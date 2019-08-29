import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  SwipeableFlatList,
  DeviceEventEmitter
} from 'react-native';
import { connect } from 'react-redux'
import { TuyaSceneApi } from '../../../sdk';
import HeadView from '../../common/HeadView'
import Item from '../../common/Item'
import { messageTask, sceneName, sceneBackground, matchType, stickyOnTop } from '../../constant'

import BaseComponent from '../../common/BaseComponent'

const { width } = Dimensions.get('window');
const Res = {
  scenebg: require('../../res/images/scenebg.png'),
  redAdd: require('../../res/images/red_add.png'),
  picTake: require('../../res/images/pic_take.png'),
  trash: require('../../res/images/trash.png'),
};

class AddScenePage extends BaseComponent {
  constructor(props) {
    super(props);

    const params = this.props.navigation.state.params;
    this.state = {
      ActionList: [],
      sceneId: params.item.id,
      homeId: this.props.homeId
    };
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener(messageTask, (data) => {
      const list = this.state.ActionList
      list.push(data)
      console.log(data)
      this.setState({
        ActionList: list.concat()
      })
    });
  }
  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  renderHeaderView() {
    return <HeadView
      leftOnPress={() => { this.props.navigation.pop() }}
      rightOnPress={() => this._save()}
      rightVisable={true}
      rightText={'save'}
    />
  }

  _save() {
    if (this.state.ActionList.length > 0) {
      //createSceneWithStickyOnTop
      TuyaSceneApi.createSceneWithStickyOnTop({
        homeId: this.state.homeId,
        name: sceneName,
        stickyOnTop,
        background: sceneBackground,
        matchType: matchType,
        tasks: this.state.ActionList,
      })
        .then(() => {
          this.props.navigation.pop();
        })
    }
  }


  _renderItem(data) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemStyle}
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
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <Image source={Res.scenebg} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 0.95 * width,
              marginTop: 5,
            }}
          >
            <Text style={{ color: '#22242C', fontSize: 14 }}>Perform the following actions</Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                borderRadius: 20,
                height: 22,
                width: 22,
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                this.props.navigation.navigate('AddActionPage', {
                  isFromScene: true,
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
                  isFromScene: true,
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
  deleteScene:{
    flexDirection: 'row',
    justifyContent: 'center',
   alignItems:'center',
   padding:10,
   borderRadius:10,
    backgroundColor: '#737270',
    height: 35,
    marginTop: 10,
    marginLeft: 130,
  }
});
export default connect((state) => ({
  homeId: state.reducers.homeId,
}))(AddScenePage)
