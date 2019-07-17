import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet, Text, TextInput, View, TouchableOpacity,
} from 'react-native';

const noop = () => {};

class Password extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    value: PropTypes.any,
    onChangeText: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    style: View.propTypes.style,
    inputStyle: TextInput.propTypes.style,
    placeholder: PropTypes.node,
    placeholderTextColor: PropTypes.string,
  }

  static defaultProps = {
    value: '',
    onChangeText: noop,
    secureTextEntry: true,
  }

  constructor(props) {
    super(props);

    this._toggoleSecureTextEntry = this._toggoleSecureTextEntry.bind(this);
    this._onChangeText = this._onChangeText.bind(this);

    this.state = {
      value: props.value || '',
      secureTextEntry: props.secureTextEntry || true,
    };
  }

  _onChangeText(text) {
    const { onChangeText } = this.props;
    this.setState({ value: text });
    onChangeText(text);
  }

  _toggoleSecureTextEntry() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

  render() {
    const { secureTextEntry, value } = this.state;
    const {
      style, inputStyle, placeholder, placeholderTextColor,
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TextInput
          underlineColorAndroid="transparent"
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          ref={view => (this._password = view)}
          onChangeText={this._onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
        />
        <View style={styles.toggle}>
          <TouchableOpacity onPress={this._toggoleSecureTextEntry}>
            <Text>Toggle</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },

  toggle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 5,
    top: 0,
    bottom: 0,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Password;
