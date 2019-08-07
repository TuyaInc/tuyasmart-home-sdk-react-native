import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { TuyaSceneApi } from '../../../sdk';
import HeadView from '../../common/HeadView'
import BaseComponent from '../../common/BaseComponent'
import CenterItem from '../../common/CenterItem'
const { width } = Dimensions.get('window');

export default class DevicesFunctionPage extends BaseComponent {
  constructor(props) {
    super(props);

    const params = this.props.navigation.state.params;
    this.state = {
      devId: params.devId,
      FunctionList: [],
      devName: params.devName,
      isFromScene: params.isFromScene,
    };
  }

  componentDidMount() {
    TuyaSceneApi.getDeviceConditionOperationList({
      devId: this.state.devId,
    })
      .then((data) => {
        this.setState({
          FunctionList: data,
        });
      })
  }

  _renderFunList(data) {
    return (
      <View
        style={{
          width,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <Image source={{ uri: data.item.iconUrl }} />
        <Text style={{ fontSize: 16, color: 'black' }}>{data.item.name}</Text>
      </View>
    );
  }

  renderHeaderView() {
    return <HeadView
      leftOnPress={() => this.props.navigation.pop()}
      centerText={'Selection function'}
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
          data={this.state.FunctionList}
          renderItem={
            ({ item }) => (
              <CenterItem
                onPress={() => {
                  if (item.type == 'bool') {
                    // 进入开关
                    this.props.navigation.navigate('ActionBoolPage', {
                      item,
                      devId: this.state.devId,
                      devName: this.state.devName,
                      isFromScene: this.state.isFromScene,
                    });
                  } else  {
                    this.showToast('Other types of UI are not yet complete')
                  }
                }}
                text={item.name}
              />
            )
          }
          style={{ width }}
        />
      </View>
    );
  }
}
