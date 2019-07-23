import React, { Component } from 'react';
import {
  View, Text, Image, Dimensions, TouchableOpacity,
} from 'react-native';

import ButtonX from '../../common/ButtonX'
const { width } = Dimensions.get('window');
const Res = {
  enterScene: require('../../res/images/enterCondition.png'),
  enterCondition: require('../../res/images/enterScene.png'),
  Arrow_right: require('../../res/images/Arrow_right.png'),
  exit: require('../../res/images/exit.png'),
};

export default class sceneHomePage extends Component {
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
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 34,
            color: 'black',
            marginTop: 80,
          }}
        >
          add scen
        </Text>
        <Text style={{ color: '#A2A3AA', fontSize: 17, marginTop: 10 }}>Please select the type</Text>
        {
          [
            {
              key: '1',
              onPress: () => {
                this.props.navigation.pop()
                this.props.navigation.navigate('AddScenePage', {
                  item: {},
                  isEdit: false,
                });
              },
              image: Res.enterScene,
              lable: 'scene',
              desc: 'One key controls multiple devices, or voice control via intelligent speakers'
            },
            {
              key: '2',
              onPress: () => {
                this.props.navigation.pop()
                this.props.navigation.navigate('AddAutoPage');
              },
              image: Res.enterCondition,
              lable: 'automation',
              desc: 'Automatically execute according to weather, equipment, time, etc.'
            }
          ].map(d => <TouchableOpacity
            onPress={() => d.onPress()}
            key={d.key}
          >
            <View
              style={{
                backgroundColor: '#3C4173',
                height: 140,
                width: width * 0.95,
                borderRadius: 8,
                marginTop: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Image style={{ marginLeft: 20 }} source={d.image} />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: 180,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}
                >
                  {d.lable}
                </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 13 }}>{d.desc}</Text>
              </View>
              <Image style={{ marginRight: 30 }} source={Res.Arrow_right} />
            </View>
          </TouchableOpacity>)
        }
        <ButtonX
          style={{ marginTop: 30 }}
          onPress={() => this.props.navigation.pop()}
          image={Res.exit}
        />
      </View>
    );
  }
}
