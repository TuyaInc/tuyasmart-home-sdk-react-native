/* eslint-disable */
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CircleView from './../CircleView'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  subject: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dpIdBg: {
    backgroundColor: '#FF5800',
    borderColor: '#FF5800',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dpId: {
    fontSize: 10,
    color: 'white',
  },

  dpName: {
    fontSize: 18,
    color: '#303030',
    marginLeft: 5,
  },
})

class DpInfoView extends Component {
  getNameLang(code, name) {
    const strKey = `dp_${code}`.toLowerCase()
    return strKey
  }

  getTypeLang(type) {
    return type
  }

  getModeLang(mode) {
    return mode
  }

  render() {
    const { id, code, name, type, mode } = this.props.dpSchema

    return (
      <View style={styles.container}>
        <View style={styles.subject}>
          <CircleView style={styles.dpIdBg} radius={10}>
            <Text style={styles.dpId}>{id}</Text>
          </CircleView>
          <Text style={styles.dpName}>{this.getNameLang(code, name)}</Text>
        </View>

        <Text style={styles.subSubject}>
          {this.getTypeLang(type)} | {this.getModeLang(mode)}
        </Text>
      </View>
    )
  }
}

DpInfoView.propTypes = {}

export default DpInfoView
