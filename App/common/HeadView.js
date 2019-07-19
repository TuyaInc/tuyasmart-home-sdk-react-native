/* eslint-disable */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, Text, StatusBar, Image, Platform, TouchableOpacity,Dimensions } from 'react-native'
const {width,height}=Dimensions.get('window')
const topBarHeight = Platform.OS=='ios' ? (height === 812 ? 88 : 64) : 56

export default class HeadView extends Component {
  static propTypes = {
    leftVisable: PropTypes.bool,
    rightVisable: PropTypes.bool,
    leftText: PropTypes.string,
    leftImage: PropTypes.object,
    rightText: PropTypes.string,
    rightImage: PropTypes.number,
    centerText: PropTypes.string,
    leftOnPress: PropTypes.func,
    rightOnPress: PropTypes.func,
    rightStyle: PropTypes.object,
    leftStyle: PropTypes.object,
    datkStyle: PropTypes.string,
    leftImageTinkColor: PropTypes.string,
    style: PropTypes.object,
    centerStyle: PropTypes.object,
    rightChildren: PropTypes.func,
    rightItemStyle: PropTypes.object,
    centerView: PropTypes.func,
    onLayout:PropTypes.func
  }

  static defaultProps = {
    leftVisable: true,
    rightVisable: false,
    leftImage: null,
    leftText: '',
    rightImage: null,
    rightText: '',
    centerText: '',
    centerView: null,
    rightOnPress: () => {},
    leftOnPress: () => {},
    leftStyle: {},
    rightStyle: {},
    datkStyle: 'dark-content',
    leftImageTinkColor: '#444444',
    style: {},
    centerStyle: {},
    rightChildren: null,
    rightItemStyle: {},
    onLayout:()=>{}
  }

  render() {
    return (
      <View style={styles.container} onLayout={(event) => this.props.onLayout(event)}>
        <StatusBar barStyle={this.props.datkStyle} />
        <View style={[styles.customerHeadrStyle, { backgroundColor: 'white' }, this.props.style]}>
          {this.renderLeft()}
          {this.props.centerView ? this.props.centerView() : this.renderCenter()}
          {this.renderRight()}
        </View>
      </View>
    )
  }

  renderCenter() {
    if (this.props.centerText) {
      return (
        <Text
          numberOfLines={1}
          style={[
            { color: '#262626', fontSize: 19, fontWeight: 'bold', textAlign: 'center', width: 150 },
            this.props.centerStyle,
          ]}
        >
          {this.props.centerText}
        </Text>
      )
    }
    return <View />
  }

  renderLeft() {
    if (this.props.leftVisable) {
      return (
        <TouchableOpacity
          onPress={() => {
            if (this.props.leftOnPress) {
              this.props.leftOnPress()
            }
          }}
          style={styles.touch}
        >
          {this.props.leftText ? (
            <Text style={[{ color: '#444444', fontSize: 17 }, this.props.leftStyle]}>{this.props.leftText}</Text>
          ) : this.props.leftImage ? (
            <Image source={this.props.leftStyle} style={[this.props.leftStyle]} />
          ) : (
            <Image
              style={[{ tintColor: this.props.leftImageTinkColor }, this.props.leftStyle]}
              source={
                require('../res/images/arrow_left.png')
              }
            />
          )}
        </TouchableOpacity>
      )
    }
    return <View style={styles.touch} />
  }

  renderRight() {
    if (this.props.rightVisable) {
      if (this.props.rightChildren) {
        return this.props.rightChildren()
      }
      return (
        <TouchableOpacity
          style={[styles.touch, this.props.rightItemStyle]}
          onPress={() => {
            if (this.props.rightOnPress) {
              this.props.rightOnPress()
            }
          }}
        >
          {this.props.rightText ? (
            <Text style={[{ color: '#444444', fontSize: 17, alignSelf: 'flex-end' }, this.props.rightStyle]}>
              {this.props.rightText}
            </Text>
          ) : this.props.rightImage ? (
            <Image source={this.props.rightImage} style={[{ alignSelf: 'flex-end',tintColor:'black' }, this.props.rightStyle]} />
          ) : (
            <View />
          )}
        </TouchableOpacity>
      )
    }
    return <View style={styles.touch} />
  }
}
const styles = StyleSheet.create({
  container: {},
  touch: {
    justifyContent: 'center',
    width: topBarHeight,
    height: topBarHeight,
  },
  customerHeadrStyle:{
    width,
    height: topBarHeight,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: Platform.OS == 'ios' ? 15 : 0,
  }
})
