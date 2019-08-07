import React, { Component } from 'react';
import {
  StyleSheet, Image, View
} from 'react-native';
import{TuyaCoreApi,TuyaPushApi} from '../../sdk/index'
import { resetAction } from '../navigations/AppNavigator';
import TabNavigator from 'react-native-tab-navigator';
import DevicesListPage from './home/DevicesListPage';
import MyPage from './home/MyPage';
import ScenePage from './home/ScenePage';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'tb_popular',
    };
  }


  componentDidMount() {
    TuyaCoreApi.setOnNeedLoginListener(()=>{
      this.props.navigation.dispatch(resetAction('LoginHomePage'));
    })
    TuyaPushApi.registerMQPushListener().then(data=>console.log(data))
    // TuyaPushApi.registerDevice({
    //   aliasId:'',
    //   pushProvider:''
    // })
  }
  componentWillUnmount(){
    TuyaCoreApi.onDestroy()
    TuyaPushApi.onDestroy()
  }

  _rendetTab(Component, selectTab, title, renderIcon) {
    return (
      <TabNavigator.Item
        selected={this.state.selectedTab === selectTab}
        selectedTitleStyle={{ color: '#FF4800' }}
        title={title}
        renderIcon={() => <Image style={styles.image} source={renderIcon} />}
        renderSelectedIcon={() => <Image style={[styles.image, { tintColor: '#FF4800' }]} source={renderIcon} />}
        onPress={() => this.setState({ selectedTab: selectTab })}
      >
        <Component {...this.props} />
      </TabNavigator.Item>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          {this._rendetTab(DevicesListPage, 'tb_popular', '我的家', require('../res/images/home.png'))}
          {this._rendetTab(ScenePage, 'tb_trending', '智能', require('../res/images/scene.png'))}
          {this._rendetTab(MyPage, 'tb_favorite', '我', require('../res/images/personal.png'))}
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 22,
    width: 22,
  },
});
