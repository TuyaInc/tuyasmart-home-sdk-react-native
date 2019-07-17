import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image, View, StyleSheet, Text, TouchableOpacity, ColorPropType, ViewPropTypes, Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default class TextButton extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    onPress: PropTypes.func,
    title: PropTypes.string,
    disabled: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={this.props.disabled ? [styles.btnUnStyle, this.props.style] : [styles.btnStyle, this.props.style]}
      >
        <Text style={[{ fontSize: 16, color: '#FFFFFF' }, this.props.textStyle]}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    width: 0.85 * width,
    height: 48,
    backgroundColor: '#FF4800',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 4,
  },
  btnUnStyle: {
    width: 0.85 * width,
    height: 48,
    backgroundColor: '#DEDEE0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 4,
  },
});
