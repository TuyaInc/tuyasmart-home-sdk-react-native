import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'


export default class EmptyView extends Component {
  static propTypes = {
   
  }

  static defaultProps = {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.lables}>{this.props.text}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  lables: {
    color: '#444444',
    fontSize: 16,
  },
})
