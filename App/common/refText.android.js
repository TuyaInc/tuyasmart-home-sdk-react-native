import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, PixelRatio, StyleSheet } from 'react-native';

// const fontScale = PixelRatio.get() / PixelRatio.getFontScale();
const fontScale = PixelRatio.getFontScale();

export default class RefText extends Component {
  static propTypes = {
    ...Text.propTypes,
    text: PropTypes.string,
    allowFontScaling: PropTypes.bool,
  }

  static defaultProps = {
    allowFontScaling: false,
  }

  constructor(props) {
    super(props);
    this.setText = this.setText.bind(this);

    this.state = {
      text: props.text ? props.text : props.children,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.text ? nextProps.text : nextProps.children });
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  setText(text) {
    this.setState({ text });
  }

  render() {
    const { style, allowFontScaling, ...fprops } = this.props;
    let fontScaleStyle = null;
    if (!allowFontScaling) {
      const flatStyle = StyleSheet.flatten([styles.text, style]);
      fontScaleStyle = { fontSize: Math.ceil(flatStyle.fontSize * fontScale) };
      if (typeof flatStyle.lineHeight !== 'undefined') {
        fontScaleStyle.lineHeight = Math.ceil(flatStyle.lineHeight * fontScale);
      }
    }

    return (
      <Text
        ref={ref => (this._root = ref)}
        allowFontScaling
        style={[styles.text, style, fontScaleStyle]}
        {...fprops}
      >
        {this.state.text}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
  },
});
