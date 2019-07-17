import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';

const UserCenterItem = (props) => {
  const {
    onPress, style, fontColor, text,
  } = props;
  const textStyle = {
    color: fontColor,
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View style={style}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

/* eslint-disable react/require-default-props */
UserCenterItem.propTypes = {
  style: View.propTypes.style,
  onPress: PropTypes.func.isRequired,
  fontColor: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default UserCenterItem;
