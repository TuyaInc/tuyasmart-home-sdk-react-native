import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,
} from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = 164;
const gap = (width - itemWidth * 2) / 6;

/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
const deviceIconUrl = require('../images/device_icon.png');

class VirtualDevice extends Component {
  static propTypes = {
    // propsName: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    console.log('------------onPress--------------');
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress} activeOpacity={0.9}>
        <View style={styles.container}>
          <Image style={styles.image} source={deviceIconUrl} />
          <Text style={styles.title}>智能空调</Text>
          <Text style={styles.text}>立即体验</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: itemWidth,
    margin: gap,
    backgroundColor: 'rgba(255,255,255,0.50)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    marginBottom: 36,
  },

  title: {
    fontSize: 15,
    color: '#303030',
    lineHeight: 17,
    marginBottom: 6,
  },

  text: {
    fontSize: 12,
    color: '#FF5800',
    lineHeight: 22,
  },
});

export default VirtualDevice;
