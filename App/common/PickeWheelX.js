import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  Platform,
} from 'react-native'
import Picker from './picker'
import ConfirmCancellation from './ConfirmCancellation'

const { width } = Dimensions.get('window')
const PickerItem = Picker.Item
export default class PickeWheelX extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      index: 0,
      data: [],
      onValueChange: () => { },
    }
  }

  show(index, data, onValueChange) {
    this.setState({ index, data, onValueChange, show: true })
  }

  render() {
    if (!this.state.show) return <View />
    return (
      <Modal
        animationType="slide"
        transparent
        visible
        onRequestClose={() => this.setState({ show: false })}
      >
        <View style={[styles.container]}>
          <View style={{ position: 'absolute', bottom: 0 }}>
            <Picker
              style={[{
                width,
                height: 160,
                backgroundColor: 'white',
              }, Platform.OS == 'android' ? {
                marignBottom: 20,
              } : {}]}
              selectedValue={this.state.index}
              itemStyle={{ color: 'black', fontSize: 16 }}
              onValueChange={(index) => {
                this.setState({
                  index,
                })
              }}
            >
              {this.state.data.map((value, i) => (
                <PickerItem label={value} value={i} key={`money${value}`} />
              ))}
            </Picker>
            <ConfirmCancellation
              close={() => {
                this.setState({ show: false })
              }}
              confirm={() => {
                this.state.onValueChange(this.state.index)
                this.setState({ show: false })
              }}
            />
          </View>
        </View>
      </Modal >
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
})
