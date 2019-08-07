import React from 'react';
import { TuyaHomeApi } from '../../../sdk'
import BaseComponet from '../../common/BaseComponent';
import HeadView from '../../common/HeadView';
import EditItem from '../../common/EditItem'
import { homeName } from '../../constant'

export default class AddRoomPage extends BaseComponet {
  constructor(props) {
    super(props);

    const params = this.props.navigation.state.params;
    this.state = {
      homeId: params.homeId,
      roomName:homeName,
    };
  }

  renderHeaderView() {
    return <HeadView
      leftOnPress={() => { this.props.navigation.pop(); }}
      rightVisable={true}
      centerText={'Add Room'}
      rightText={'Save'}
      rightOnPress={() => {
        TuyaHomeApi.addRoom({
          homeId: this.state.homeId,
          name: this.state.roomName,
        })
          .then(() => {
            this.props.navigation.pop();
          })
      }}
    />
  }

  renderContent() {
    return (
      <EditItem
        leftText={'room name'}
        value={this.state.roomName} onChangeText={(data) => {
          this.setState({
            roomName: data
          })
        }}
      />
    );
  }
}


