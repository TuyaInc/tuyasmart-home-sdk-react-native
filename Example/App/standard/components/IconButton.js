/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Text, View, TouchableOpacity, Image } from 'react-native'

// eslint-disable-next-line react/prefer-stateless-function
class IconButton extends Component {
  static propTypes = {
    /* eslint-disable react/require-default-props */
    uri: Image.propTypes.source,
    onPress: PropTypes.func,
    style: View.propTypes.style,
    // title: View.propTypes.style,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    iconStyle: View.propTypes.style,
  }

  render() {
    const { uri, onPress, style, title, color, fontSize, iconStyle } = this.props

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <View style={style}>
          <Image source={uri} style={iconStyle} />
          <Text
            style={{
              color,
              fontSize,
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default IconButton
