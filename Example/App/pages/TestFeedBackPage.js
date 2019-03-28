import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions, BackHandler,
} from 'react-native';
import TuyaFeedBackApi from '../api/TuyaFeedBackApi';
import TextButton from '../component/TextButton';

const { height, width } = Dimensions.get('window');

export default class TestFeedBackPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop();
      return true;
    });

    TuyaFeedBackApi.getFeedbackList()
      .then((data) => {
        console.log('----->getFeedbackList', data);
      })
      .catch((e) => {
        console.log('--->err', err);
      });

    TuyaFeedBackApi.getFeedbackType()
      .then((data) => {
        console.log('----->getFeedbackType', data);
      })
      .catch((e) => {
        console.log('--->err', err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextButton
          style={{
            backgroundColor: 'red',
            width: 80,
            height: 30,
            marginTop: 5,
          }}
          title="新增反馈"
          onPress={() => {
            TuyaFeedBackApi.addFeedback({
              message: '哈哈', // 反馈内容
              contact: '123123123', // 联系方式（电话或邮箱）
              hdId: '6c03b81fade341ad12bezz', // 反馈类目id
              hdType: 2, // 反馈类型
            })
              .then((data) => {
                console.log('---->addFeedback', data);
              })
              .catch((e) => {
                console.log('err->', err);
              });
          }}
          textStyle={{ color: '#A2A3AA' }}
        />
        <TextButton
          style={{
            backgroundColor: 'red',
            width: 80,
            height: 30,
            marginTop: 5,
          }}
          title="getMsgList"
          onPress={() => {
            TuyaFeedBackApi.getFeedbackMsg({
              hdId: '6c03b81fade341ad12bezz', // 反馈类目id
              hdType: 2, // 反馈类型
            })
              .then((data) => {
                console.log('---->getMsgList', data);
              })
              .catch((e) => {
                console.log('err->', err);
              });
          }}
          textStyle={{ color: '#A2A3AA' }}
        />
        <TextButton
          style={{
            backgroundColor: 'red',
            width: 80,
            height: 30,
            marginTop: 5,
          }}
          title="addMsg"
          onPress={() => {
            TuyaFeedBackApi.addMsg({
              message: 'hahahaah', // 反馈内容
              contact: '123123123', // 联系方式（电话或邮箱）
              hdId: '6c03b81fade341ad12bezz', // 反馈类目id
              hdType: 2, // 反馈类型
            })
              .then((data) => {
                console.log('---->addMsg', data);
              })
              .catch((e) => {
                console.log('err->', err);
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
