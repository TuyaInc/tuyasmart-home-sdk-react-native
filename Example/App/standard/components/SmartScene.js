import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet, Text, View, Image,
} from 'react-native';

import TuyaButton from './TuyaButton';

class SmartScene extends Component {
  static propTypes = {
    // propsName: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  _execute() {
    console.log('execute');
  }

  renderLeft() {
    const { data } = this.props;

    return (
      <View style={styles.left}>
        <Image style={styles.image} source={data.icon} />
        <Text>{data.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderLeft()}
        <TuyaButton style={styles.btn} color="#8A8E91" fontSize={12} title="执行" onPress={() => this._execute()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEEF4',
  },

  left: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  image: {
    marginRight: 15,
  },

  btn: {
    height: 24,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8A8E91',
    borderRadius: 100,
    opacity: 0.4,
  },
});

export default SmartScene;
