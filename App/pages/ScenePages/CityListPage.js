import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TuyaSceneApi} from '../../../sdk';
import HeadView from '../../common/HeadView'
import BaseComponent from '../../common/BaseComponent'
const {  width } = Dimensions.get('window');


export default class CityListPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
    };
  }

  componentDidMount() {
    TuyaSceneApi.getCityListByCountryCode({ countryCode: 'cn' })
      .then((data) => {
        this.setState({
          cityList: data,
        });
      })
  }

  renderHeaderView(){
    return <HeadView
    centerText={'Choosing the City'}
    leftOnPress={()=>this.props.navigation.pop()}
    />
  }
  renderContent() {
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
        <FlatList
          data={this.state.cityList}
          style={{ width }}
          renderItem={({ item,  }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.state.params.success(item)
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
