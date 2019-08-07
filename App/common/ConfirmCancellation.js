import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonX from './ButtonX'

import { StyleSheet, View, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default class ConfirmCancellation extends Component {
    static propTypes = {
      close: PropTypes.func,
      confirm: PropTypes.func,
    }

    static defaultProps = {
      close: () => {

      },
      confirm: () => {

      },
    }

    render() {
      return (
        <View style={styles.itembottom}>
          <ButtonX
            style={styles.cancelbtn}
            onPress={() => {
              this.props.close()
            }}
            text={'Cancel'}
            textStyle={styles.cancelText}
          />
          <ButtonX
            style={styles.comfirmbtn}
            onPress={() => {
              this.props.confirm()
            }}
            text={'Save'}
            textStyle={styles.comfirmText}
          />
        </View>
      )
    }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelbtn: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#E6E6E6',
    backgroundColor: 'white',
  },
  cancelText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  comfirmText: {
    fontSize: 16,
    color: '#FF4800',
    fontWeight: 'bold',
  },
  comfirmbtn: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderColor: '#E6E6E6',
    backgroundColor: 'white',
  },
  itembottom: {
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
