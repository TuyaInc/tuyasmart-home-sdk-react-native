import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  SwipeableFlatList,
  TouchableOpacity,
} from 'react-native';
import {TuyaSceneApi} from '../../../sdk';

import Toast from 'react-native-easy-toast';
import NavigationBar from '../../common/NavigationBar';

import ViewUtils from '../../utils/ViewUtils';
import Strings from '../../i18n';
import { connect } from 'react-redux'

const {  width } = Dimensions.get('window');
const Res = {
  setting: require('../../res/images/scene_settings.png'),
};

class DeleteScenePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sceneList: [],
      homeId:this.props.homeId,
    };
  }

  componentDidMount() {
    console.log("---->this.state.homeId",this.state.homeId)
    TuyaSceneApi.getSceneList({ homeId: this.state.homeId })
      .then((data) => {
        console.log('-getSceneList--->', data);
        this.setState({
          sceneList: data,
        });
      })
      .catch((err) => {
        console.log('---getSceneList->', err);
      });
  }

  _renderItem(data) {
    console.log('--->data', data);
    return (
      <View style={styles.itemStyle}>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            flex: 1,
            marginRight: 15,
          }}
        >
          {`${data.item.name}`}
        </Text>
        <Image
          style={{
            height: 24,
            width: 24,
            resizeMode: 'stretch',
            marginRight: 15,
          }}
          source={Res.setting}
        />
      </View>
    );
  }

  getQuickActions = item => (
    <View style={styles.quickAContent}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          TuyaSceneApi.deleteScene({ sceneId: item.id })
            .then((data) => {
              const newArr = new Array();
              for (let i = 0, j = this.state.sceneList.length; i < j; i++) {
                if (this.state.sceneList[i].id != item.id) {
                  newArr.push(this.state.sceneList[i]);
                }
              }
              this.setState({
                sceneList: newArr,
              });
              this.toast.show('删除成功', DURATION.LENGTH_SHORT);
            })
            .catch((err) => {
              console.warn('--err', err);
              this.toast.show('删除失败', DURATION.LENGTH_SHORT);
            });
        }}
      >
        <View style={styles.quick}>
          <Text style={styles.delete}>{Strings.delete}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  _renderFooter() {
    return (
      <View
        style={{
          width,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#A2A3AA', fontSize: 13 }}>There are no scenarios at present.</Text>
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#F8F8F8',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flex: 1,
        }}
      >
        <NavigationBar
          style={{ backgroundColor: '#F4F4F5', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          title="delete "
        />
        <SwipeableFlatList
          data={this.state.sceneList}
          ref={(ref) => {
            this._flatListRef = ref;
          }}
          renderItem={this._renderItem}
          style={{ width }}
          renderQuickActions={({ item }) => this.getQuickActions(item)} // 创建侧滑菜单
          maxSwipeDistance={80} // 可展开（滑动）的距离
          bounceFirstRowOnMount // 进去的时候不展示侧滑效果
          ListEmptyComponent={this._renderFooter(this.props)}
        />
        <Toast ref={toast => (this.toast = toast)} />
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
    justifyContent: 'space-between',
    marginBottom: 1,
    marginLeft: 8,
    marginRight: 8,
    width,
    backgroundColor: '#FFFFFF',
  },
});
export default connect((state) => ({
  homeId:state.reducers.homeId,
}))(DeleteScenePage)