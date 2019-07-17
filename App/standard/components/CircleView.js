import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ColorPropType } from 'react-native';

class CircleView extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: PropTypes.node,
    radius: PropTypes.number.isRequired,
    style: View.propTypes.style,
    color: ColorPropType,
    borderColor: ColorPropType,
    borderWidth: PropTypes.number,
  }

  static defaultProps = {
    borderWidth: 1.5,
  }

  render() {
    const {
      radius, style, color, borderColor, borderWidth,
    } = this.props;
    const propStyle = {
      borderWidth: borderWidth || 1.5,
      backgroundColor: color || null,
      borderColor: borderColor || color || null,
    };

    return (
      <View
        style={[
          { borderWidth: 1.5 },
          propStyle,
          style,
          {
            overflow: 'hidden',
            borderRadius: radius,
            height: radius * 2,
            width: radius * 2,
          },
        ]}
      >
        {this.props.children}
      </View>
    );
  }
}

export default CircleView;
