import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';

import Voice from './Voice';

class SmartCard extends Component {
  renderTopTitle() {
    return (
      <View style={styles.title}>
        <Text style={styles.txt}>智能控制</Text>
      </View>
    );
  }

  renderSceneModeList() {
    const list = [1, 2, 3, 4, 5];

    return (
      <ScrollView style={styles.sceneMode} horizontal>
        {list.map(item => (
          <View style={styles.card} key={item}>
            <Text style={styles.txt}>{`item${item}`}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        <Text style={styles.txt}>晚上好</Text>
        <Voice />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTopTitle()}
        {this.renderSceneModeList()}
        {this.renderFooter()}
      </View>
    );
  }
}

SmartCard.propTypes = {};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    height: 180,
    backgroundColor: '#FF5800',
    borderRadius: 6,
    justifyContent: 'center',
    paddingLeft: 18,
    paddingRight: 18,
  },

  title: {
    alignItems: 'flex-start',
  },

  txt: {
    opacity: 0.6,
    fontSize: 10,
    color: '#FFFFFF',
    lineHeight: 22,
  },

  sceneMode: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 14,
  },

  card: {
    width: 54,
    height: 78,
    marginRight: 12,
    marginLeft: 12,
  },

  footer: {
    height: 44,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SmartCard;
