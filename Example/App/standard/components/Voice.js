/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const onPress = () => console.log('----------- onPress -----------')

class ReactComponetClassName extends Component {
  static propTypes = {
    // propsName: PropTypes.func.isRequired,
  }

  render() {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <View style={styles.container}>
          <Text>Voice</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
})

export default ReactComponetClassName
