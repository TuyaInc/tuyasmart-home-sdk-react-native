import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

import Item from '../../common/Item'
import InputDialog from '../../common/InputDialog';

import HeadView from '../../common/HeadView'
import BaseComponent from '../../common/BaseComponent'
import TuyaDeviceApi from '../../../sdk/lib/TuyaDeviceApi'

const { width } = Dimensions.get('window');


class DeviceSettingPage extends BaseComponent {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;

    this.state = {
      devId: params.devId,
      devInfo: params.devInfo,
      devName: params.devInfo.name,
      homeId: this.props.reducers.homeId,
    };
  }

  renderHeaderView() {
    return <HeadView
      leftOnPress={() => this.props.navigation.pop()}
      centerText={'Device Setting'}
    />
  }

  renderContent() {
    return (
      <View style={styles.container}>
        <Item
          leftText={'Device name'}
          rightText={this.state.devName}
          onPress={() => {
            this.inputDialog &&
              this.inputDialog.show({
                title: 'rename',
                value: this.state.devName || '',
                confim: (name) => {
                  TuyaDeviceApi.renameDevice({ devId: this.state.devId, name }).then(() => this.getUser())
                },
              })
          }}
        />
        <Item
          leftText={'Shared devices'}
          onPress={() => {
            this.props.navigation.navigate('SharePage', {
              homeId: this.state.homeId,
              devId: this.state.devId,
            });
          }}
        />
        <Item
          leftText={'Create Group'}
          onPress={() => {
            this.props.navigation.navigate('GroupPage', {
              homeId: this.state.homeId,
              devId: this.state.devId,
              productId: this.state.devInfo.productId,
            });
          }}
        />
        <Item
          leftText={'Feedback'}
        />
        <Item
          leftText={'Remove device'}
          onPress={() => {
            TuyaDeviceApi.removeDevice({
              devId: this.state.devId
            })
            this.props.navigation.pop(2)
          }}
        />
      </View>
    );
  }

  renderExpendView() {
    return <View>
      <InputDialog ref={ref => (this.inputDialog = ref)} />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
  tips: {
    color: '#81828B',
    fontSize: 13,
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  itemStyle: {
    width,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
  },
  itemStyle2: {
    width,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 80,
  },
});
export default connect(state => ({
  ...state,
}))(DeviceSettingPage);
