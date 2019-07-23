import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { TuyaSceneApi } from '../../../sdk';
import { connect } from 'react-redux'
import HeadView from '../../common/HeadView'
import BaseComponent from '../../common/BaseComponent'


const { width } = Dimensions.get('window');
const Res = {
  scenebg: require('../../res/images/scenebg.png'),
  redAdd: require('../../res/images/red_add.png'),
  plug: require('../../res/images/plug.png'),
};

class AddActionPage extends BaseComponent {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      DevicesLists: [],
      isFromScene: params.isFromScene,
      homeId: this.props.homeId,
    };
  }

  componentDidMount() {
    TuyaSceneApi.getConditionDevList({ homeId: this.state.homeId })
      .then((data) => {
        this.setState({
          DevicesLists: data,
        });
      })
  }

  renderHeaderView() {
    return <HeadView
      leftOnPress={() => { this.props.navigation.pop() }}
      centerText={'Selective action'}
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
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: 45,
            }}
          >
            <Image source={Res.plug} style={{ marginLeft: 20 }} />
            <Text style={{ color: '#22242C', fontSize: 16, marginLeft: 20 }}>Control Intelligent Equipment</Text>
          </View>
          <FlatList
            data={this.state.DevicesLists}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('DevicesFunctionPage', {
                    devId: item.devId,
                    devName: item.name,
                    isFromScene: this.state.isFromScene,
                  });
                }}
              >
                <View
                  style={{
                    width,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Image source={{ uri: item.iconUrl }} />
                  <Text style={{ fontSize: 16, color: 'black' }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={{ width }}
          />
        </View>
      </View>
    );
  }
}
export default connect((state) => ({
  homeId: state.reducers.homeId,
}))(AddActionPage)
