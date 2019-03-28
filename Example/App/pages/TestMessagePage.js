import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions, BackHandler,
} from 'react-native';
import TuyaMessageApi from '../api/TuyaMessageApi';
import TextButton from '../component/TextButton';

const { height, width } = Dimensions.get('window');
export default class TestMessagePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: [],
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop();
      return true;
    });

    TuyaMessageApi.getMessageList()
      .then((data) => {
        console.log('getMessageList----->', data);
        this.setState({
          messageList: data,
        });
      })
      .catch((err) => {
        console.log('getMessageList--->', err);
      });

    TuyaMessageApi.getMessageMaxTime()
      .then((data) => {
        console.log('getMessageMaxTime----->', data);
      })
      .catch((err) => {
        console.log('getMessageList--->', err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextButton
          style={{
            backgroundColor: 'red',
            width,
            height: 30,
            marginTop: 5,
          }}
          title="删除信息"
          onPress={() => {
            TuyaMessageApi.deleteMessage({ ids: ['44341084'] })
              .then((data) => {
                console.log('deleteMessage----->', data);
                this.setState({
                  messageList: data,
                });
              })
              .catch((err) => {
                console.log('deleteMessage--->', err);
              });
          }}
          textStyle={{ color: '#A2A3AA' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: 22,
    width: 22,
  },
});
