import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, ScrollView,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Strings from '../i18n';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const p = 90;
const w = 2 * p;
const r = p - 10;
export default class ProgressView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const progress = parseFloat(this.props.progress / this.props.maxSize);
    const t = progress * 360;
    const progressX = p + Math.sin(t * (Math.PI / 180)) * r;
    const progressY = p - Math.cos(t * (Math.PI / 180)) * r;
    const progressdecription = [
      'M',
      p,
      p - r,
      'A',
      r,
      r,
      0,
      parseInt(progress * 100) >= 50 ? 1 : 0,
      1,
      progressX,
      progressY,
    ].join(' ');
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Svg height={w} width={w}>
          <Circle cx={p} cy={p} r={r} stroke="#DFDFDF" strokeWidth="2" fill="white" />
          <Path d={progressdecription} fill="none" stroke="#FF5800" strokeWidth={2} />
        </Svg>
        <Text
          style={{
            color: '#4F545C',
            fontSize: 24,
            position: 'absolute',
            textAlign: 'center',
          }}
        >
          {parseInt(progress * 100)}
          {'%'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
