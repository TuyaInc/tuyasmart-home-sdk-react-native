import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
  StyleSheet, Text, View, ListView, NativeModules, TouchableOpacity,
} from 'react-native';

import SectionList from './SectionList';

const { UIManager } = NativeModules;
const noop = () => {};

class SelectableSectionsListView extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    data: PropTypes.object.isRequired,
    onScrollToSection: PropTypes.func,
    sectionHeaderHeight: PropTypes.number,
    headerHeight: PropTypes.number,
    cellHeight: PropTypes.number,
    useDynamicHeights: PropTypes.bool,
    compareFunction: PropTypes.func,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    onScrollToSection: noop,
    onSelect: noop,
    sectionHeaderHeight: 36,
    cellHeight: 40,
    headerHeight: 0,
    useDynamicHeights: false,
  }

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(props.data),
    };

    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this._scrollToSection = this._scrollToSection.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = this.state;

    this.setState({
      dataSource: dataSource.cloneWithRowsAndSections(nextProps.data),
    });
  }

  _onSelect(item) {
    this.props.onSelect(item);
  }

  _scrollToSection(section) {
    let y = 0;
    const headerHeight = this.props.headerHeight || 0;
    y += headerHeight;

    if (!this.props.useDynamicHeights) {
      const cellHeight = this.props.cellHeight;
      const sectionHeaderHeight = this.props.sectionHeaderHeight;
      let keys = Object.keys(this.props.data);
      if (typeof this.props.compareFunction === 'function') {
        keys = keys.sort(this.props.compareFunction);
      }
      const index = keys.indexOf(section);

      let numcells = 0;
      for (let i = 0; i < index; i += 1) {
        numcells += this.props.data[keys[i]].length;
      }

      const t = index * sectionHeaderHeight;
      y += numcells * cellHeight + t;
      const maxY = this.totalHeight - this.containerHeight + headerHeight;
      y = y > maxY ? maxY : y;

      this._listview.scrollTo({ x: 0, y, animated: true });
    } else {
      UIManager.measureLayout(
        this.cellTagMap[section],
        // eslint-disable-next-line
        ReactNative.findNodeHandle(this._listview),
        () => {},
        (x, y, w, h) => {
          // eslint-disable-next-line
          y -= this.props.sectionHeaderHeight
          this._listview.scrollTo({ x: 0, y, animated: true });
        },
      );
    }

    this.props.onScrollToSection && this.props.onScrollToSection(section);
  }

  renderRow(item) {
    return (
      <TouchableOpacity onPress={() => this._onSelect(item)} activeOpacity={0.9}>
        <View style={[styles.rowStyle, { height: this.props.cellHeight }]}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={[styles.header, { height: this.props.sectionHeaderHeight }]}>
        <Text style={styles.sectionStyle}>{sectionID}</Text>
      </View>
    );
  }

  renderSectionList() {
    const { data } = this.props;

    return <SectionList sections={Object.keys(data)} data={data} onSectionSelect={this._scrollToSection} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          ref={view => (this._listview = view)}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
        {this.renderSectionList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: -1,
    flex: 1,
  },

  header: {
    zIndex: 100,
    bottom: -1,
    padding: 10,
    backgroundColor: '#eee',
  },

  sectionStyle: {},

  rowStyle: {
    zIndex: 9,
    backgroundColor: '#fff',
    marginLeft: 8,
    marginRight: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
});

export default SelectableSectionsListView;
