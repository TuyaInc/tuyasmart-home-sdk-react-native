import React from 'react';
import {
  View,
  DeviceEventEmitter,
  Platform
} from 'react-native';
import { TuyaSceneApi } from '../../../sdk';

import Item from '../../common/Item'
import HeadView from '../../common/HeadView'
import BaseComponent from '../../common/BaseComponent'
import { messageCondition, cityId } from '../../constant'

export default class ConditionPage extends BaseComponent {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      placeBean: '',
      localCity: '',
      item: params.item
    };
  }

  renderHeaderView() {
    return <HeadView leftOnPress={() => this.props.navigation.pop()} rightVisable={true}
      rightOnPress={() => this._save()} rightText={'save'} />
  }

  _save() {
    if (this.state.localCity.length !== 0) {
      TuyaSceneApi.createWeatherCondition({
        place: this.state.placeBean,
        ruleType: typeof (this.getValue()) == Number ? 'value' : 'enum',
        type: this.getType(),
        range: this.getRange(),
        value: this.getValue(),
      }).then(data => {
        DeviceEventEmitter.emit(messageCondition, data)
        this.props.navigation.pop(2)
      })


    } else {
      this.showToast('The city has not yet been chosen');
    }
  }

  getValue() {
    if (this.state.item.operators.length > 1) {
      return "20"
    } else {
      for (key in this.state.item.property.enums) {
        return key
      }
    }
  }
  getName() {
    if (Platform.OS == 'ios') {
      return this.state.item.property.name
    }
    return this.state.item.name
  }
  getType() {
    if (Platform.OS == 'ios') {
      return this.state.item.property.code
    }
    return this.state.item.type
  }
  getRange() {
    if (Platform.OS == 'ios') {
      return (this.state.item.property && this.state.item.property.property.range) ? "==" : "<"
    }
    return this.state.item.operators[0]
  }
  renderContent() {
    const { item } = this.state
    return (
      <View>
        <Item
          rightText={this.state.localCity}
          onPress={() => {
            this.props.navigation.navigate('CityListPage', {
              success: (value) => {
                this.setState({
                  localCity: value.city,
                  placeBean: value,
                })
              }
            })
          }}
          leftText={'Choosing the City'}
        />
        <Item
          leftText={this.getName()}
          rightText={this.getType()}
        />
        <Item
          rightText={this.getValue()}
          leftText={'value'}
        />
        <Item
          rightText={this.getRange()}
          leftText={'range'}
        />
      </View>
    );
  }
}
