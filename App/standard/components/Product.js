import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

import {
  StyleSheet, Text, View, Image, TouchableOpacity,
} from 'react-native';

// eslint-disable-next-line
const productIcon = require('../images/device_icon.png')

class Product extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this._goToPanel = this._goToPanel.bind(this);
  }

  _goToPanel() {
    const { data } = this.props;
    const routeName = 'Panel';
    const action = NavigationActions.navigate({
      routeName,
      params: {
        product: data,
      },
    });
    this.props.navigation.dispatch(action);
  }

  renderIcon() {
    const { iconUrl } = this.props.data;

    return <Image source={{ uri: iconUrl }} style={styles.icon} />;
  }

  renderContent() {
    const { name } = this.props.data;

    return (
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.txt}>已开启</Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={this._goToPanel}>
        <View style={styles.container}>
          {this.renderIcon()}
          {this.renderContent()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 6,
    paddingLeft: 19,
    paddingRight: 25,
  },

  icon: {
    width: 64,
    height: 64,
    marginRight: 15,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#ECEEF4',
    shadowColor: 'rgba(232,232,232,0.54)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },

  content: {
    justifyContent: 'flex-start',
    paddingTop: 22,
  },

  title: {
    fontSize: 15,
    color: '#303030',
    lineHeight: 17,
    marginBottom: 6,
  },

  txt: {
    fontSize: 12,
    color: '#8A8E91',
    lineHeight: 14,
  },
});

export default Product;
