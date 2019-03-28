import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image, View, StyleSheet, Text, TouchableOpacity, ColorPropType, ViewPropTypes,
} from 'react-native';

import RefText from './refText';

export default class ButtonX extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    ...TouchableOpacity.propTypes,
    contentContainerStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    imageStyle: Image.propTypes.style,
    tintColor: ColorPropType, // android下无效....
    overlayColor: ColorPropType,
    image: PropTypes.number,
    text: PropTypes.string,
    textDirection: PropTypes.oneOf(['left', 'top', 'right', 'bottom', 'center']),
    singleLine: PropTypes.bool,
    disabledOpacity: PropTypes.number,
  }

  static defaultProps = {
    activeOpacity: 0.9,
    textDirection: 'bottom',
    singleLine: true,
    disabledOpacity: 0.4,
  }

  _renderText() {
    return (
      <RefText
        numberOfLines={this.props.singleLine ? 1 : null}
        style={[styles.textStyle, this.props.textStyle, this.props.tintColor && { color: this.props.tintColor }]}
        text={this.props.text}
      />
    );
  }

  render() {
    const {
      style,
      contentContainerStyle,
      imageStyle,
      tintColor,
      overlayColor,
      image,
      text,
      textDirection,
      disabledOpacity,
      ...fprops
    } = this.props;
    const direction = !!text && (textDirection === 'left' || textDirection === 'right') ? 'row' : 'column';
    return (
      <TouchableOpacity {...fprops} style={[styles.container, style]}>
        <View
          style={[
            styles.contentContainerStyle,
            { flexDirection: direction },
            contentContainerStyle,
            overlayColor && { backgroundColor: overlayColor },
            fprops.disabled && { opacity: disabledOpacity },
          ]}
        >
          {!!text && (textDirection === 'left' || textDirection === 'top') && this._renderText()}
          {!!image && (
            <View style={[styles.imageWrap, this.__boxSize]}>
              <Image
                onLayout={({ nativeEvent: { layout: { width: layoutWidth, height: layoutHeight } } }) => {
                  if (this.__boxSize || layoutWidth * layoutHeight === 0) {
                    return;
                  }
                  this.__boxSize = {
                    width: layoutWidth,
                    height: layoutHeight,
                  };
                  this.setState({});
                }}
                resizeMode="contain"
                source={image}
                style={[styles.imageStyle, imageStyle, tintColor ? { tintColor } : null]}
              />
              {!!text && textDirection === 'center' && this._renderText()}
              {this.props.children}
            </View>
          )}
          {!image && this.props.children}
          {!!text && (textDirection === 'right' || textDirection === 'bottom') && this._renderText()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},

  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
