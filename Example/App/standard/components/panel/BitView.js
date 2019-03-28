import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, ScrollView, Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 150,
    height: 35,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 4,
    opacity: 0.5,
  },

  textInput: {
    flex: 1,
    margin: 1,
    fontSize: 14,
    color: '#303030',
  },
});

class BitView extends Component {
  constructor(props) {
    super(props);

    const value = this.parseLable(props.value, props.label);
    this.state = {
      text: value,
    };
  }

  /* eslint-disable react/require-default-props */
  static propTypes = {
    label: PropTypes.array,
    value: PropTypes.any,
    style: View.propTypes.style,
  }

  parseLable(value, labels) {
    const strs = [];
    for (let i = 0; i < labels.length; i++) {
      if ((1 << i) & value) {
        strs.push(`${i + 1}> ${labels[i]}`);
      }
    }
    return strs.join('\n');
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView>
          <Text style={styles.textInput} numberOfLines={this.props.label.length}>
            {this.state.text}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

BitView.propTypes = {};

export default BitView;
