import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text } from 'react-native';

export default class RefText extends Component {
  static propTypes = {
    ...Text.propTypes,
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
    return (
      <Text ref={ref => (this._root = ref)} {...this.props}>
        {this.state.text}
      </Text>
    );
  }
}
