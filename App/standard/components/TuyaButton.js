import React from 'react';
import PropTypes from 'prop-types';

import {
  Text, View, TouchableOpacity, StyleSheet,
} from 'react-native';

const noop = () => {};

const TuyaButton = (props) => {
  const {
    onPress, style, title, color, fontSize, disable,
  } = props;
  const viewStyle = [style];
  const txtStyle = [
    {
      color,
      fontSize,
    },
  ];
  let _onPress = onPress;

  if (disable) {
    viewStyle.push(styles.disable);
    txtStyle.push(styles.disableTxt);
    _onPress = noop;
  }

  return (
    <TouchableOpacity onPress={_onPress} activeOpacity={1}>
      <View style={viewStyle}>
        <Text style={txtStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

TuyaButton.propTypes = {
  title: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  style: View.propTypes.style,
  // eslint-disable-next-line react/require-default-props
  disable: PropTypes.bool,
};

const styles = StyleSheet.create({
  disable: {
    backgroundColor: '#DBDBDB',
  },

  disableTxt: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default TuyaButton;
