import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

class EnumView extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    // value: PropTypes.node.isRequired,
    readonly: PropTypes.bool.isRequired,
    style: View.propTypes.style,
    strValues: PropTypes.object,
    selected: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this._onPress = this._onPress.bind(this);

    this.state = {
      selected: props.selected,
      strValues: props.strValues || {},
    };
  }

  _onPress() {}

  render() {
    const { readonly } = this.props;
    const { selected, strValues } = this.state;

    return (
      <TouchableOpacity style={this.props.style} activeOpacity={0.8} onPress={this._onPress}>
        <View style={[styles.container, readonly ? { opacity: 0.5 } : null]}>
          <Text style={styles.text}>{strValues[selected]}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 150,
    height: 36,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    flex: 1,
    fontSize: 14,
    color: '#303030',
    marginHorizontal: 10,
  },

  // icon: {
  //   alignItems: 'flex-end',
  //   margin: 10,
  // },
});

export default EnumView;
