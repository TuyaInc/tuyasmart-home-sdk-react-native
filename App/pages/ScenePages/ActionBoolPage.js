import React from 'react';
import {
  View,
  DeviceEventEmitter
} from 'react-native';
import HeadView from '../../common/HeadView'
import BaseComponent from '../../common/BaseComponent'
import Item from '../../common/Item'
import { messageTask } from '../../constant'

export default class ActionBoolPage extends BaseComponent {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      item: params.item,
      devId: params.devId,
      devName: params.devName,
      isFromScene: params.isFromScene,
    };
  }

  renderHeaderView() {
    return <HeadView
      centerText={this.state.item.name}
      leftOnPress={() => this.props.navigation.pop()}
    />
  }

  getCondition(value) {
    return {
      dpId: this.state.item.dpId,
      value,
      devId: this.state.devId,
      devName: this.state.devName,
      dpName: this.state.item.name,
    }
  }
  renderContent() {
    return <View>
      {
        [
          {
            key: 'open',
            label: '开',
            onPress: () => {
              DeviceEventEmitter.emit(messageTask, this.getCondition(true))
              this.props.navigation.pop(3)
            }
          },
          {
            key: 'close',
            label: '关',
            onPress: () => {
              DeviceEventEmitter.emit(messageTask, this.getCondition(false))
              this.props.navigation.pop(3)
            }
          }
        ].map(d => <Item
          key={d.key}
          onPress={() => d.onPress()}
          leftText={d.label}
        />)
      }
    </View>
  }
}
