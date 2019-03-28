import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  DeviceEventEmitter,
  Platform,
  Modal,
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import Picker from 'react-native-wheel-picker';
import ViewUtils from '../../utils/ViewUtils';
import { resetAction } from '../../navigations/AppNavigator';
import NavigationBar from '../../common/NavigationBar';
import DeviceStorage from '../../utils/DeviceStorage';
import { conditionSettingConfig } from '../../config';

const { height, width } = Dimensions.get('window');

const PickerItem = Picker.Item;
const Res = {
  enterScene: require('../../res/images/enterCondition.png'),
  enterCondition: require('../../res/images/enterScene.png'),
  exit: require('../../res/images/exit.png'),
  arrowRight: require('../../res/images/Arrow_right.png'),
  currentKey: require('../../res/images/currentKey.png'),
  cloud: require('../../res/images/cloud.png'),
};
const SYMBOL = ['>', '==', '<'];
const temperatureDatas = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
];

export default class ConditionPage extends Component {
  constructor(props) {
    super(props);

    const params = this.props.navigation.state.params;
    console.log('--->params', params);
    let config = new Array();
    if (params.item.type === 'humidity') {
      config = conditionSettingConfig.humidity; // 湿度
    } else if (params.item.type === 'condition') {
      config = conditionSettingConfig.condition; // 天气
    } else if (params.item.type === 'sunsetrise') {
      config = conditionSettingConfig.sunsetrise; // 日落日出
    }

    this.state = {
      title: params.item.name,
      localCity: '',
      currentIndex: 0,
      currentValue: '',
      conditionData: config,
      type: params.item.type,
      placeBean: '',
      selectedItem: 0,
      symbolList: ['大于', '等于', '小于'],
      currentSymbolValue: SYMBOL[0],
      currentTempValue: '5',
      range: '>',
    };
  }

  // initDatas () {
  //   temperatureDatas = []
  //   for (i = 0; i <= 40; i++) {
  //     // const t = i * 1.8 + 32
  //     temperatureDatas.push(i)
  //   }
  // }

  componentDidMount() {
    this.chooseCityListener = DeviceEventEmitter.addListener('chooseCity', (value) => {
      console.warn('--->value', value);
      this.setState({
        localCity: value.item.city,
        placeBean: value.item,
      });
    });
  }

  getRightButton() {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: 80,
        }}
        onPress={() => {
          if (this.state.localCity.length !== 0) {
            if (this.state.type == 'humidity' || this.state.type == 'condition' || this.state.type == 'sunsetrise') {
              DeviceStorage.get('Condition').then((data) => {
                const arr = new Array();
                if (data != undefined) {
                  for (let i = 0, j = data.length; i < j; i++) {
                    arr.push(data[i]);
                  }
                  arr.push({
                    type: this.state.type,
                    cityId: 793409505965772800,
                    rule: this.state.currentValue,
                    localCity: this.state.localCity,
                    placeBean: this.state.placeBean,
                    entityType: 3, // 创建天气类型需要 6，设备传1,定时传3
                  });
                  DeviceStorage.save('Condition', arr);
                  this.props.navigation.dispatch(resetAction('AddAutoPage'));
                } else {
                  arr.push({
                    type: this.state.type,
                    cityId: 793409505965772800,
                    rule: this.state.currentValue,
                    localCity: this.state.localCity,
                    placeBean: this.state.placeBean,
                    entityType: 3, // 创建天气类型需要 6，设备传1,定时传3
                  });
                  DeviceStorage.save('Condition', arr);
                  this.props.navigation.dispatch(resetAction('AddAutoPage'));
                }
              });
            } else {
              DeviceStorage.get('Condition').then((data) => {
                const arr = new Array();
                if (data != undefined) {
                  for (let i = 0, j = data.length; i < j; i++) {
                    arr.push(data[i]);
                  }
                  arr.push({
                    type: this.state.type,
                    cityId: 793409505965772800,
                    rule: this.state.currentTempValue,
                    localCity: this.state.localCity,
                    placeBean: this.state.placeBean,
                    range: this.state.range,
                    entityType: 3, // 创建天气类型需要 6，设备传1,定时传3
                  });
                  DeviceStorage.save('Condition', arr);
                  this.props.navigation.dispatch(resetAction('AddAutoPage'));
                } else {
                  arr.push({
                    type: this.state.type,
                    cityId: 793409505965772800,
                    rule: this.state.currentTempValue,
                    localCity: this.state.localCity,
                    placeBean: this.state.placeBean,
                    range: this.state.range,
                    entityType: 3, // 创建天气类型需要 6，设备传1,定时传3
                  });
                  DeviceStorage.save('Condition', arr);
                  this.props.navigation.dispatch(resetAction('AddAutoPage'));
                }
              });
            }
          } else {
            this.toast.show('城市还没选(^_^)', DURATION.LENGTH_LONG);
          }
        }}
      >
        <Text style={{ color: 'black', fontSize: 16, marginRight: 10 }}>下一步</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const list = this.state.type === 'humidity' || this.state.type === 'condition' || this.state.type === 'sunsetrise' ? (
      <FlatList
        data={this.state.conditionData}
        style={{ width, marginTop: 40 }}
        renderItem={({ item, index }) => {
          console.log('--->item', item);
          console.log('---indx', index);
          return (
            <TouchableOpacity
              onPress={() => {
                console.log('--->data', item);
                this.setState({
                  currentIndex: index,
                  currentValue: item.key,
                });
              }}
              style={{
                width,
                height: 50,
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'black', fontSize: 14, marginLeft: 20 }}>{item.label}</Text>
              {this.state.currentIndex === index && <Image source={Res.currentKey} style={{ marginRight: 20 }} />}
            </TouchableOpacity>
          );
        }}
      />
    ) : null;
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
        <NavigationBar
          style={{ backgroundColor: '#F4F4F5', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          rightButton={this.getRightButton(this.props)}
          title={this.state.title}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('CityListPage');
          }}
        >
          <View
            style={{
              width,
              height: 50,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              backgroundColor: '#FFFFFF',
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 16, color: 'black', marginLeft: 20 }}>选择城市</Text>
            <Text style={{ color: '#81828B', fontSize: 14 }}>{this.state.localCity}</Text>
            <Image style={{ marginRight: 20 }} source={Res.arrowRight} />
          </View>
        </TouchableOpacity>
        {list}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 180,
            marginTop: 30,
          }}
        >
          <Picker
            style={{ width: 150, height: 180, backgroundColor: 'red' }}
            selectedValue={this.state.selectedItem}
            itemStyle={{ color: 'black', fontSize: 26 }}
            onValueChange={(index) => {
              console.log('---pickerindex,index', index);
              this.setState({
                currentSymbolValue: SYMBOL[index],
                range: SYMBOL[index],
              });
            }}
          >
            {this.state.symbolList.map((value, i) => <PickerItem label={value} value={i} key={value} />)}
          </Picker>
          <Picker
            style={{ width: 150, height: 180, backgroundColor: 'red' }}
            selectedValue={this.state.selectedItem}
            itemStyle={{ color: 'black', fontSize: 26 }}
            onValueChange={(index) => {
              console.log('---pickerindex,index', index);
              this.setState({
                currentTempValue: temperatureDatas[index],
              });
            }}
          >
            {temperatureDatas.map((value, i) => <PickerItem label={value} value={i} key={value} />)}
          </Picker>
        </View>
        <Toast ref={toast => (this.toast = toast)} />
      </View>
    );
  }
}
