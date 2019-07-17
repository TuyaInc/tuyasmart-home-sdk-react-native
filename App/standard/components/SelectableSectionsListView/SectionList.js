import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View } from 'react-native';

const returnTrue = () => true;

class SectionList extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    onSectionSelect: PropTypes.func,

    sections: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,

    // eslint-disable-next-line react/require-default-props
    fontStyle: Text.propTypes.style,

    // eslint-disable-next-line react/require-default-props
    style: View.propTypes.style,
  }

  constructor(props) {
    super(props);

    this.resetSection = this.resetSection.bind(this);
    this.onSectionSelect = this.onSectionSelect.bind(this);
    this.detectAndScrollToSection = this.detectAndScrollToSection.bind(this);
    this.lastSelectedIndex = null;
  }

  componentDidMount() {
    this.fixSectionItemMeasure();
  }

  componentDidUpdate() {
    this.fixSectionItemMeasure();
  }

  componentWillUnmount() {
    this.measureTimer && clearTimeout(this.measureTimer);
  }

  onSectionSelect(sectionId, fromTouch) {
    this.props.onSectionSelect && this.props.onSectionSelect(sectionId);

    if (!fromTouch) {
      this.lastSelectedIndex = null;
    }
  }

  fixSectionItemMeasure() {
    const sectionItem = this._sectionItem0;

    if (!sectionItem) {
      return;
    }

    this.measureTimer = setTimeout(() => {
      sectionItem.measure((x, y, width, height, pageX, pageY) => {
        this.measure = {
          y: pageY,
          width,
          height,
        };
      });
    }, 0);
  }

  resetSection() {
    this.lastSelectedIndex = null;
  }

  detectAndScrollToSection(e) {
    const ev = e.nativeEvent.touches[0];

    const targetY = ev.pageY;
    const { y, height } = this.measure;

    if (!y || targetY < y) {
      return;
    }

    let index = Math.floor((targetY - y) / height);
    index = Math.min(index, this.props.sections.length - 1);

    if (this.lastSelectedIndex !== index && this.props.data[this.props.sections[index]].length) {
      this.lastSelectedIndex = index;
      this.onSectionSelect(this.props.sections[index], true);
    }
  }

  renderSectionList() {
    const { sections } = this.props;

    return sections.map((section, index) => {
      const textStyle = this.props.data[section].length ? styles.text : styles.inactivetext;

      return (
        <View key={section} ref={view => (this[`_sectionItem${index}`] = view)}>
          <View style={styles.item}>
            <Text style={[textStyle, this.props.fontStyle]}>{section}</Text>
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <View
        style={[styles.container, this.props.style]}
        onMoveShouldSetResponder={returnTrue}
        onStartShouldSetResponder={returnTrue}
        onResponderGrant={this.detectAndScrollToSection}
        onResponderMove={this.detectAndScrollToSection}
        onResponderRelease={this.resetSection}
      >
        {this.renderSectionList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'center',
    right: 5,
    top: 0,
    bottom: 0,
  },

  item: {
    padding: 2,
  },

  text: {
    fontWeight: '700',
    color: '#008fff',
  },

  inactivetext: {
    fontWeight: '700',
    color: '#CCCCCC',
  },
});

export default SectionList;
