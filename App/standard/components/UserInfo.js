import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

import {
  StyleSheet, Text, View, Image, TouchableOpacity,
} from 'react-native';

// eslint-disable-next-line
const iconUrl = require('../images/ty_user_icon_default.png')

class UserInfo extends Component {
  static propTypes = {
    /* eslint-disable react/require-default-props */
    style: View.propTypes.style,
    user: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this._goToUserInfo = this._goToUserInfo.bind(this);

    this.state = {
      iconUrl,
    };
  }

  _goToUserInfo() {
    const routeName = 'UserInfo';
    const action = NavigationActions.navigate({ routeName });
    this.props.navigation.dispatch(action);
  }

  renderInfo() {
    const { nickName, fullName } = this.props.user;

    return (
      <View style={styles.info}>
        <Text style={styles.nickName}>{nickName}</Text>
        <Text style={styles.fullName}>{fullName}</Text>
      </View>
    );
  }

  render() {
    const { style } = this.props;

    return (
      <TouchableOpacity onPress={this._goToUserInfo} activeOpacity={1}>
        <View style={[style, styles.container]}>
          <Image source={iconUrl} style={styles.iconStyle} />
          {this.renderInfo()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },

  iconStyle: {
    marginRight: 12,
  },

  info: {
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },

  nickName: {
    fontSize: 14,
    height: 20,
    alignSelf: 'flex-start',
    color: '#303030',
  },

  fullName: {
    fontSize: 14,
    height: 18,
    alignSelf: 'center',
    color: '#B0B0B0',
  },
});

export default UserInfo;
