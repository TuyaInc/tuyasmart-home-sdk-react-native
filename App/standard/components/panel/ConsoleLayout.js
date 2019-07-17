import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, Button, StyleSheet, ScrollView,
} from 'react-native';

class ConsoleLayout extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    logs: PropTypes.array.isRequired,
    doClear: PropTypes.func,
    style: View.propTypes.style,
  }

  constructor(props) {
    super(props);

    this._renderRow = this._renderRow.bind(this);
    this.state = {
      code: false,
    };
  }

  tapCodeBtn() {
    this.setState({
      code: !this.state.code,
    });
  }

  _renderRow(v, k) {
    const strFlag = v.isSend ? '\t<发送>\t' : '\t<接收>\t';
    const color = v.isSend ? '#F5A623' : '#5FB336';
    const content = this.state.code ? v.strCodes : v.strIds;

    return (
      <Text key={k} style={[styles.item, { color }]}>
        {v.time}
        {strFlag}
        {content}
      </Text>
    );
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView style={styles.list}>{this.props.logs.map((v, k) => this._renderRow(v, k))}</ScrollView>
        <Button style={styles.clear} onPress={this.props.doClear} text="CLEAR" textStyle={styles.clearText} />
        <Button
          style={[styles.format, this.state.code ? { backgroundColor: '#F5A623' } : null]}
          onPress={this.tapCodeBtn}
          text="CODE"
          textStyle={styles.clearText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#303A4B',
  },

  clear: {
    borderWidth: 1,
    borderColor: '#303A4B',
    borderRadius: 3,
    padding: 5,
    right: 15,
    bottom: 10,
    position: 'absolute',
  },

  format: {
    borderWidth: 1,
    borderColor: '#303A4B',
    borderRadius: 3,
    padding: 5,
    right: 70,
    bottom: 10,
    position: 'absolute',
  },

  clearText: {
    backgroundColor: 'transparent',
    fontSize: 12,
    color: '#303A4B',
  },

  list: {
    flex: 1,
    overflow: 'hidden',
    marginVertical: 1,
  },

  item: {
    fontSize: 10,
    marginHorizontal: 2,
    marginTop: 5,
  },
});

export default ConsoleLayout;
