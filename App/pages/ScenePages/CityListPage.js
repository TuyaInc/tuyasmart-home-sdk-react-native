import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';
import {TuyaSceneApi} from '../../../sdk';

import ViewUtils from '../../utils/ViewUtils';
import NavigationBar from '../../common/NavigationBar';

const {  width } = Dimensions.get('window');


export default class ConditionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityList: [],
    };
  }

  componentDidMount() {
    TuyaSceneApi.getCityListByCountryCode({ countryCode: 'cn' })
      .then((data) => {
        console.log('--->getcontry', data);
        this.setState({
          cityList: data,
        });
      })
      .catch((err) => {
        console.warn('--->err', err);
      });
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#F8F8F8',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flex: 1,
        }}
      >
        <NavigationBar
          style={{ backgroundColor: '#F4F4F5', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          title="选择城市"
        />

        <FlatList
          data={this.state.cityList}
          style={{ width }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                DeviceEventEmitter.emit('chooseCity', { item });
                this.props.navigation.pop();
              }}
              style={{
                width,
                height: 50,
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'black', fontSize: 14, marginLeft: 20 }}>{item.city}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
