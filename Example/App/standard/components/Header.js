import React from 'react';
import PropTypes from 'prop-types';

import { View, StyleSheet } from 'react-native';

const Header = (props) => {
  const {
    left, center, right, style,
  } = props;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>{left}</View>
      <View style={styles.center}>{center}</View>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

/* eslint-disable react/require-default-props */
Header.propTypes = {
  style: View.propTypes.style,
  left: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  center: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  right: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  left: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 12,
    justifyContent: 'center',
  },

  right: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 12,
    justifyContent: 'center',
  },

  center: {
    justifyContent: 'center',
  },
});

export default Header;
