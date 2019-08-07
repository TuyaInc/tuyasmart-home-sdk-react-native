import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native'



const { height, width } = Dimensions.get('window')
export default class InputDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      hintText: '',
      value: '',
      rightbel: 'save',
      confim: () => { },
      show: false,
    }
  }

  show(data) {
    this.setState({
      ...data,
      show: true,
    })
  }

  render() {
    if (!this.state.show) return <View />
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible
        onRequestClose={() => this.setState({ show: false })}
      >
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => this.setState({ show: false })}>
          <View
            style={styles.dialog}
          >
            <View style={styles.container}>
              <View
                style={{
                  height: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#F8F8F8',
                  width: 327,
                  borderRadius: 5,
                }}
              >
                <Text style={styles.lables}>{this.state.title}</Text>
              </View>
              <TextInput
                style={{
                  marginLeft: 24,
                  width: 327,
                  fontSize: 16,
                  marginTop: 16,
                  marginBottom: 16,
                  color: 'black',
                }}
                underlineColorAndroid={'transparent'}
                caretHidden={false}
                placeholderTextColor={'#9B9B9B'}
                value={this.state.value}
                onChangeText={value => this.setState({ value })}
                placeholder={this.state.hintText}
              />
              <View style={styles.btnBottom}>
                <TouchableOpacity
                  onPress={() => this.setState({ show: false })}
                  style={styles.btn}
                >
                  <Text style={styles.cancel}>{'cancel'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.state.confim(this.state.value)
                    this.setState({ show: false })
                  }}
                  style={[styles.btn, { borderRightWidth: 0 }]}
                >
                  <Text style={styles.confirm}>{this.state.rightbel}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  dialog: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width,
    height,
    position: 'absolute',
    left: 0,
    justifyContent:'center',
    alignItems:'center'
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent:'center',
    width: 327,
    borderRadius: 5,
  },
  lables: {
    color: '#22242C',
    fontSize: 16,
  },
  des: {
    color: '#22242C',
    fontSize: 13,
    textAlign: 'center',
  },
  btn: {
    flex: 1,
    height: 56,
    width: 327 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  btnBottom: {
    width: 327,
    height: 56,
    flexDirection: 'row',
  },
  cancel: {
    fontSize: 16,
    color: '#22232C',
    fontWeight: '600',
  },
  confirm: {
    fontSize: 16,
    color: '#FF4800',
  },
  line: { backgroundColor: '#CDCED2', width, height: 1 },
})
