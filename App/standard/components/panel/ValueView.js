import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

class ValueView extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    value: PropTypes.node.isRequired,
    readonly: PropTypes.bool.isRequired,
    style: View.propTypes.style,
  }

  render() {
    const { style, value, readonly } = this.props;
    return (
      <View style={[styles.container, style, readonly ? { opacity: 0.5 } : null]}>
        <TouchableOpacity
          onPress={this._decrement}
          activeOpacity={0.8}
          style={[styles.iconStyle, { paddingRight: 20 }]}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <Text style={styles.valueStyle}>{value}</Text>
        <View style={styles.line} />
        <TouchableOpacity onPress={this._increment} activeOpacity={0.8} style={[styles.iconStyle, { paddingLeft: 20 }]}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
  },

  line: {
    backgroundColor: '#DDDDDD',
    width: 1,
    height: 36,
  },

  iconStyle: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  valueStyle: {
    flex: 1,
    color: '#303030',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default ValueView;
