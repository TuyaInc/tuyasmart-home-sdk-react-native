import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions, TouchableOpacity, FlatList,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import { resetAction } from '../../navigations/AppNavigator';
import TuyaSceneApi from '../../api/TuyaSceneApi';
import DeviceStorage from '../../utils/DeviceStorage';
import TextButton from '../../component/TextButton';
import ViewUtils from '../../utils/ViewUtils';

const { height, width } = Dimensions.get('window');
const Res = {
  enterScene: require('../../res/images/enterCondition.png'),
  enterCondition: require('../../res/images/enterScene.png'),
  exit: require('../../res/images/exit.png'),
  arrowRight: require('../../res/images/Arrow_right.png'),
};

export default class ConditionListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conditionList: [],
    };
  }

  componentDidMount() {
    TuyaSceneApi.getConditionList({ showFahrenheit: false })
      .then((data) => {
        console.log('---->getConditionList', data);
        this.setState({ conditionList: data });
      })
      .catch((err) => {
        console.log('--->err', err);
      });
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flex: 1,
          backgroundColor: '#F8F8F8',
        }}
      >
        <NavigationBar
          style={{ backgroundColor: '#F4F4F5', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          title="选择条件"
        />
        <FlatList
          data={this.state.conditionList}
          style={{ width }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                console.log('---->item', item);
                this.props.navigation.navigate('ConditionPage', {
                  item,
                });
              }}
            >
              <View
                style={{
                  width,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ fontSize: 16, color: 'black', marginLeft: 20 }}>{item.entityName}</Text>
                <Image source={{ uri: item.newIcon }} style={{ tintColor: 'black' }} />
                <Image style={{ marginRight: 20 }} source={Res.arrowRight} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
