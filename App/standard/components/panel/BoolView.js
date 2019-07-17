import React from 'react';
import PropTypes from 'prop-types';

import {
  // Switch,
  StyleSheet,
} from 'react-native';

import Switch from 'react-native-switch-pro';

const styles = StyleSheet.create({
  container: {
    width: 100,
    borderWidth: 1,
    borderColor: '#ECEEF4',
  },
});

const BoolView = (props) => {
  const { value, onChange } = props;

  return <Switch value={value} style={styles.container} onValueChange={onChange} />;
};

/* eslint-disable react/require-default-props */
BoolView.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

export default BoolView;
