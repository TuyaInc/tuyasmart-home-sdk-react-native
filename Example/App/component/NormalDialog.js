import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ColorPropType,
  ViewPropTypes,
  Dimensions,
  Modal,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default class NormalDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
  }

  static defaultProps = {
    title: '',
    visible: false,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent={false}
        onRequestClose={() => {
          console.warn('--->aa');
        }}
        style={styles.container}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfview: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: height * 0.4,
    height: 0.3 * height,
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderRadius: 16,
  },
  cancelbtn: {
    width: width * 0.8 / 2,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: 'transparent',
  },
  comfirmbtn: {
    width: width * 0.8 / 2,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: 'transparent',
  },
  cancelText: {
    fontSize: 15,
    color: '#22242C',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  comfirmText: {
    fontSize: 15,
    color: '#22242C',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInputStyle: {
    fontSize: 15,
    color: '#666666',
    width: width * 0.8,
    borderColor: 'gray',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 4,
    textAlign: 'center',
  },
});
