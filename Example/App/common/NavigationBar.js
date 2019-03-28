/**
 * NavigationBar
 * @flow
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {
  StyleSheet, Platform, TouchableOpacity, Image, StatusBar, Text, View,
} from 'react-native';

const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};
export default class NavigationBar extends Component {
  static propTypes = {
    style: PropTypes.object,
    title: PropTypes.string,
    titleView: PropTypes.element,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    rightButton: PropTypes.element,
    leftButton: PropTypes.element,
  }

  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false,
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      hide: false,
    };
  }

  getButtonElement(data) {
    return <View style={styles.navBarButton}>{data || null}</View>;
  }

  render() {
    const statusBar = !this.props.statusBar.hidden ? (
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar} />
      </View>
    ) : null;

    const titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>;

    const content = this.props.hide ? null : (
      <View style={styles.navBar}>
        {this.getButtonElement(this.props.leftButton)}
        <View style={styles.navBarTitleContainer}>{titleView}</View>
        {this.getButtonElement(this.props.rightButton)}
      </View>
    );
    return (
      <View style={[styles.container, this.props.style]}>
        {statusBar}
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196F3',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    top: 0,
    right: 40,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  navBarButton: {
    alignItems: 'center',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
  },
});
