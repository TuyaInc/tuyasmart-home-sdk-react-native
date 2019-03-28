import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Dimensions, Modal, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import ButtonX from '../standard/components/buttonX';
import CheckUtils from '../utils/CheckUtils';
import Strings from '../i18n';

const { height, width } = Dimensions.get('window');

export default class EditDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
  }

  static defaultProps = {
    title: '编辑',
    visible: true,
  }

  /* eslint-disable */
  render() {
    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.props.visible}
        onRequestClose={() => {
          if (this.props.onRequestClose) this.props.onRequestClose()
        }}
      >
        <View style={styles.allview}>
          <View style={styles.halfview}>
            <View
              style={{
                width: 0.8 * width,
                backgroundColor: '#F8F8F8',
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#22242C', fontSize: 16 }}>{this.props.title}</Text>
            </View>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(event) => {
                this.props.textValue(event)
              }}
              textContentType={this.props.type}
              value={this.props.inputValue}
              multiline={false}
              underlineColorAndroid="transparent"
              placeholder={Strings.companyscoredes}
              clearButtonMode="while-editing"
              keyboardType={'numeric'}
            />
            <View
              style={{
                width,
                height: 56,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
              }}
            >
              <ButtonX
                style={styles.cancelbtn}
                onPress={() => {
                  this.props.cancel()
                }}
              >
                <Text style={styles.cancelText}>{Strings.cancel}</Text>
              </ButtonX>
              <ButtonX
                style={styles.comfirmbtn}
                onPress={() => {
                  this.props.save()
                }}
              >
                <Text style={styles.comfirmText}>{Strings.save}</Text>
              </ButtonX>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  allview: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfview: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: height * 0.5,
    height: CheckUtils.isIphoneX() ? 0.25 * height - 30 : 0.25 * height,
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderRadius: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  comfirmText: {
    fontSize: 16,
    color: '#FF4800',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelbtn: {
    width: width * 0.8 / 2,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: 'white',
  },
  comfirmbtn: {
    width: width * 0.8 / 2,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: 'white',
  },
  textInputStyle: {
    fontSize: 18,
    color: 'black',
    width: width * 0.8,
    borderColor: 'gray',
    height: 56,
    paddingLeft: 15,
    paddingRight: 15,
  },
})
