/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet, Text, Navigator, Image, View, DeviceEventEmitter,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Toast, { DURATION } from 'react-native-easy-toast';
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
    this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
      this.toast.show(text, DURATION.LENGTH_SHORT);
    });
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
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
        <Toast ref={toast => (this.toast = toast)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  image: {
    height: 22,
    width: 22,
  },
});
