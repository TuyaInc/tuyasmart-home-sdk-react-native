import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

const RegionSelectInput = (props) => {
  const { onPress, style } = props;

  return (
    <View style={style}>
      <Text style={styles.item}>Country</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.select}>{'usa +1 >'}</Text>
      </TouchableOpacity>
    </View>
  );
};

RegionSelectInput.propTypes = {
  /* eslint-disable react/require-default-props */
  style: View.propTypes.style,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    lineHeight: 18,
    fontSize: 16,
    color: '#9B9B9B',
  },

  select: {
    flex: 1,
    lineHeight: 18,
    fontSize: 16,
    color: '#303030',
  },
});

export default RegionSelectInput;
