import React from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet, View, StatusBar, Platform,
} from 'react-native';

import Header from './Header';

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const TopBarView = (props) => {
  const {
    style, topbarStyle, statusBarbackgroundColor, hiddenStatusBar, center, left, right,
  } = props;

  return (
    <View style={[styles.container, style]}>
      <StatusBar backgroundColor={statusBarbackgroundColor} hidden={hiddenStatusBar} />
      <Header style={[styles.topbar, topbarStyle]} left={left} center={center} right={right} />
      {props.children}
    </View>
  );
};

/* eslint-disable react/require-default-props */
TopBarView.propTypes = {
  style: View.propTypes.style,
  topbarStyle: View.propTypes.style,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  left: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  center: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  right: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  hiddenStatusBar: PropTypes.bool,
  statusBarbackgroundColor: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#FFFFFF',
  },

  topbar: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopBarView;
