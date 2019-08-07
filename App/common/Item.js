import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'

const { width } = Dimensions.get('window')
export default class Item extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    showRightImage: PropTypes.bool,
    leftText: PropTypes.string,
    rightText: PropTypes.string,
    style: PropTypes.object,
    textStyle: PropTypes.object,
    start: PropTypes.bool,
    rightHintText: PropTypes.string,
    rightImage: PropTypes.obj,
    renderRightView: PropTypes.object
  }

  static defaultProps = {
    onPress: () => { },
    showRightImage: true,
    leftText: '',
    rightText: '',
    style: {},
    textStyle: {},
    start: false,
    rightHintText: '',
    rightImage: null,
    renderRightView: null
  }


  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.props.onPress()
        }}
      >
        <View style={[styles.item, this.props.style]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {this.props.start && <Text style={styles.start}>*</Text>}
            <Text style={[styles.text, this.props.textStyle]}>{this.props.leftText}</Text>
          </View>
          {
            this.props.renderRightView ?
              <View style={styles.rightGroup}>{this.props.renderRightView()}</View> :
              <View style={styles.rightGroup}>
                <Text style={styles.rightText} numberOfLines={1}>
                  {this.props.rightText || this.props.rightHintText}
                </Text>
                {this.props.showRightImage &&
                  <Image source={this.props.rightImage || require('../res/images/Arrow_right.png')} />}
              </View>
          }
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width,
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E4E4E4',
    paddingLeft: 15,
  },
  text: {
    color: '#444444',
    fontSize: 14,
    textAlign: 'center',
  },
  rightGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
    paddingRight: 15,
    flex: 1,
  },
  rightText: {
    color: '#9B9B9B',
    fontSize: 14,
    marginRight: 8,
    textAlign: 'right',
    width: 200,
  },
  start: {
    color: '#ff6161',
    marginRight: 8,
  },
})
