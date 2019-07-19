import React from 'react';
import { TuyaHomeApi } from '../../../sdk'
import BaseComponet from '../../component/BaseComponet';
import HeadView from '../../common/HeadView';
import Item from '../../common/Item'
import { homeName } from '../../constant'

export default class AddRoomPage extends BaseComponet {
  constructor(props) {
    super(props);

    const params = this.props.navigation.state.params;
    this.state = {
      homeId: params.homeId,
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
          name: homeName,
        })
          .then(() => {
            this.props.navigation.pop();
          })
          .catch((err) => {
          });
      }}
    />
  }

  renderContent() {
    return (
      <Item 
      style={{marginTop:20}}
      leftText={homeName}
     />
    );
  }
}


