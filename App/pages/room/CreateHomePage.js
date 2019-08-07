import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import { TuyaHomeManagerApi } from '../../../sdk/index'
import Item from '../../common/Item'
import EditItem from '../../common/EditItem'

import BaseComponent from '../../common/BaseComponent';
import HeadView from '../../common/HeadView';

import {
  lon,
  lat,
  geoName,
  homeName,
  rooms
} from '../../constant'
export default class CreateHomePage extends BaseComponent {
  constructor(props){
    super(props)
    this.state={
      homeName,
      geoName
    }
  }
  renderHeaderView() {
    return <HeadView
      leftOnPress={() => this.props.navigation.pop()}
      centerText={'Create Home'}
      rightText={'Save'}
      rightVisable={true}
      rightOnPress={() => {
        TuyaHomeManagerApi.createHome({
          name: this.state.homeName,
          lon,
          lat,
          geoName:this.state.geoName,
          rooms,
        })
          .then(() => {
            this.props.navigation.state.params.success()
            this.props.navigation.pop();

          })
      }}
    />
  }
  renderContent() {
    return (
      <View style={styles.container}>
        <EditItem leftText={'Home Name'} value={this.state.homeName} onChangeText={(data) => {
          this.setState({
            homeName: data
          })
        }} />
         <EditItem leftText={'Home location'} value={this.state.geoName} onChangeText={(data) => {
          this.setState({
            geoName: data
          })
        }} />
        <Text style={{ color: '#81828B', fontSize: 13, marginTop: 10 }}>Which rooms have smart devices?:</Text>
        {
          rooms.map(d => <Item
            leftText={d}
            rightImage={require('../../res/images/select.png')}
          />)
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',

    backgroundColor: '#F8F8F8',
  },
  tips: {
    fontSize: 29,
  },
});
