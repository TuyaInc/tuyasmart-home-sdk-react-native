import React from 'react';
import {
  FlatList,
} from 'react-native';
import { TuyaSceneApi } from '../../../sdk';

import Item from '../../common/Item'

import HeadView from '../../common/HeadView'
import BaseComponent from '../../common/BaseComponent'

export default class ConditionListPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      conditionList: [],
    };
  }

  componentDidMount() {
    TuyaSceneApi.getConditionList({ showFahrenheit: false })
      .then((data) => {
        this.setState({ conditionList: data });
      })
  }

  renderHeaderView() {
    return <HeadView
      centerText={'Selection conditions'}
      leftOnPress={() => this.props.navigation.pop()}
    />
  }
  renderContent() {
    return (
      <FlatList
        data={this.state.conditionList}
        renderItem={({ item }) => <Item
          leftText={item.entityName}
          onPress={() => {
            this.props.navigation.navigate('ConditionPage', {
              item,
            })
          }}
        />}
      />
    );
  }
}
