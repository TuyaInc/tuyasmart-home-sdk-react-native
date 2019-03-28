import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, ListView, StyleSheet } from 'react-native';

import DpItemView from './DpItemView';

class ContentLayout extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    style: View.propTypes.style,
    dpData: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this._renderRow = this._renderRow.bind(this);

    const ds = new ListView.DataSource({ rowHasChanged: () => true });

    this.state = {
      dataSource: ds.cloneWithRows(props.dpData.schema),
    };
  }

  _renderRow(rowData) {
    return (
      <DpItemView
        style={styles.item}
        key={rowData.id}
        dpSchema={rowData}
        devId={this.props.dpData.devId}
        dpStatus={this.props.dpData.status[rowData.id]}
        uiConfig={this.props.dpData.uiConfig[rowData.id]}
      />
    );
  }

  render() {
    return (
      <ListView
        style={this.props.style}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        enableEmptySections
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 5,
  },
});

export default ContentLayout;
