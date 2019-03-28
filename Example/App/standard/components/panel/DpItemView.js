import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, StyleSheet } from 'react-native';

import API from '../../RNKit';
import BoolView from './BoolView';
import ValueView from './ValueView';
import EnumView from './EnumView';
import StringView from './StringView';
import BitView from './BitView';
import RawView from './RawView';

import DpInfoView from './DpInfoView';

class DpItemView extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    dpStatus: PropTypes.number.isRequired,
    dpSchema: PropTypes.object.isRequired,
    devId: PropTypes.string.isRequired,
    style: View.propTypes.style,
  }

  constructor(props) {
    super(props);

    this._onChangeHandle = this._onChangeHandle.bind(this);
  }

  _onChangeHandle(value) {
    const code = this.props.dpSchema.code;
    const devId = this.props.devId;
    API.Device.putDpData(devId, { [code]: value })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    // const { dpSchema, dpStatus, uiConfig } = this.props;
    const { dpSchema, dpStatus } = this.props;

    return (
      <View style={[styles.container, this.props.style]}>
        <DpInfoView dpSchema={dpSchema} />
        {dpSchema.property.type === 'bool' && <BoolView value={dpStatus} onChange={this._onChangeHandle} />}
        {dpSchema.property.type === 'value' && (
          <ValueView
            style={styles.itemView}
            readonly={dpSchema.mode === 'ro'}
            max={dpSchema.max}
            min={dpSchema.min}
            step={dpSchema.step}
            value={dpStatus}
            onChange={this._onChangeHandle}
          />
        )}
        {dpSchema.property.type === 'enum' && (
          <EnumView
            style={styles.itemView}
            readonly={dpSchema.mode === 'ro'}
            value={dpStatus}
            selected={dpStatus}
            onChange={this._onChangeHandle}
          />
        )}
        {dpSchema.property.type === 'string' && (
          <StringView
            style={styles.itemView}
            readonly={dpSchema.mode === 'ro'}
            value={dpStatus}
            onChange={this._onChangeHandle}
          />
        )}
        {dpSchema.property.type === 'raw' && (
          <RawView
            style={styles.itemView}
            readonly={dpSchema.mode === 'ro'}
            value={dpStatus}
            onChange={this._onChangeHandle}
          />
        )}
        {dpSchema.property.type === 'bitmap' && (
          <BitView
            style={styles.itemView}
            readonly={dpSchema.mode === 'ro'}
            value={dpStatus}
            label={dpSchema.label || []}
            onChange={this._onChangeHandle}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderColor: 'red',
    borderRadius: 2,
    borderWidth: 0,
  },

  itemView: {},
});

export default DpItemView;
