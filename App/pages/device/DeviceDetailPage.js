import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Switch,
} from 'react-native';
import { TuyaDeviceApi } from '../../../sdk/index'

import BaseComponent from '../../common/BaseComponent';
import ButtonX from '../../common/ButtonX';
import Item from '../../common/Item';

import HeadView from '../../common/HeadView';

const { width } = Dimensions.get('window');

export default class DeviceDetailPage extends BaseComponent {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    const schema = JSON.parse(params.devInfo.productBean.schemaInfo.schema)
    this.state = {
      devId: params.devId,
      devInfo: params.devInfo,
      schema,
      dps: params.devInfo.dps,
    };
  }

  getDpList() {
    list = []
    this.state.schema.forEach(s => list.push(s.id + ''))
  }
  componentDidMount() {
    this.getDpList()
    TuyaDeviceApi.registerDevListener(
      { devId: this.state.devId },
      (data) => {
        this.setState({
          dps: JSON.parse(data.dpStr),
          schema: this.state.schema.concat(),
        })
      },
      (data) => {
        console.warn('onRemoved', data);
      },
      (data) => {
        console.warn('onStatusChanged', data);
      },
      (data) => {
        console.warn('onNetworkStatusChanged', data);
      },
      (data) => {
        console.warn('onDevInfoUpdate', data);
      },
    );
  }

  componentWillUnmount() {
    TuyaDeviceApi.unRegisterDevListener({ devId: this.state.devId });
    TuyaDeviceApi.onDestroy({ devId: this.state.devId })
  }


  renderHeaderView() {
    return <HeadView
      centerText={this.state.devInfo.name}
      leftOnPress={() => this.props.navigation.pop()}
      rightVisable={true}
      rightText={'setting'}
      rightOnPress={() => {
        this.props.navigation.navigate('DeviceSettingPage', {
          devId: this.state.devId,
          devInfo: this.state.devInfo,
        });
      }}
    />
  }
  renderRightView(item) {
    const { mode, id, property } = item
    const { type } = property
    const dpValue = this.state.dps[id + '']
    if (mode == 'rw') {
      if (type == 'bool') {
        return (
          <Switch
            style={{ marginRight: 20 }}
            onValueChange={() => {
              const dps = {
                [id]: !dpValue
              };
              TuyaDeviceApi.publishDps({
                devId: this.state.devId,
                dps: JSON.stringify(dps),
              })
            }}
            value={dpValue == 1}
            thumbColor="white"
            trackColor="#7DB428"
            trackColor="#A09E9B"
          />
        );
      }
    }
    return <Text >Demo is not supported for the time being</Text>
  }
  renderContent() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.schema}
          renderItem={
            ({ item }) => (
              <Item
                leftText={item.name}
                showRightImage={false}
                renderRightView={() => this.renderRightView(item)}
              />
            )
          }
        />
        <ButtonX
          style={styles.bottom}
          onPress={() => {
            this.props.navigation.navigate('TimerHomePage', {
              devId: this.state.devId,
              devInfo: this.state.devInfo,
            });
          }}
          text={'Timing Page'}
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
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  bottom: {
    height: 50,
    width,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
