import React from 'react';
import {
  View, StyleSheet, Text, Image, Dimensions, TouchableOpacity,
} from 'react-native';
import { TuyaHomeManagerApi } from '../../sdk/index'
import Item from '../common/Item'
import NavigationBar from '../common/NavigationBar';
import BaseComponet from '../component/BaseComponet';

import ButtonX from '../standard/components/buttonX';
import ViewUtils from '../utils/ViewUtils';
const { width } = Dimensions.get('window');
import {
  lon,
  lat,
  geoName,
  homeName,
  rooms
} from '../constant'
export default class CreateHomeListPage extends BaseComponet {

  _renderRightBtn() {
    return (
      <ButtonX
        onPress={() => {
          TuyaHomeManagerApi.createHome({
            name: homeName,
            lon,
            lat,
            geoName,
            rooms,
          })
            .then(() => {
              this.props.navigation.navigate('HomePage');
            })
            .catch((err) => {
              console.warn('err', err);
            });
        }}
      >
        <Text style={{ fontSize: 18, color: 'black', marginRight: 10 }}>Save</Text>
      </ButtonX>
    );
  }

  renderHeaderView() {
    return <NavigationBar
      style={{ backgroundColor: '#FFFFFF', width }}
      leftButton={ViewUtils.getLeftButton(() => {
        this.props.navigation.pop();
      })}
      rightButton={this._renderRightBtn()}
      title="Home Setting"
      
    />
  }
  renderContent() {
    return (
      <View style={styles.container}>
        <Item
          leftText={'Home name'}
          rightText={homeName}
        />
        <Item
          leftText={'Home location'}
          rightText={geoName}
        />
        <Text style={{ color: '#81828B', fontSize: 13, marginTop: 10 }}>Which rooms have smart devices?:</Text>
        <Item
          leftText={rooms[0]}
          rightImage={require('../res/images/select.png')}
        />
        <Item
          leftText={rooms[1]}
          rightImage={require('../res/images/select.png')}
        />
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
