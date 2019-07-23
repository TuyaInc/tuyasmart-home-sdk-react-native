import React from 'react';
import {
  View, StyleSheet, Text, Dimensions,
} from 'react-native';
import {TuyaUserApi} from '../../sdk'
import ButtonX from '../common/ButtonX';
import TextButton from '../component/TextButton';
import { resetAction } from '../navigations/AppNavigator';
import BaseComponent from '../common/BaseComponent';

const {  width } = Dimensions.get('window');

export default class CreateHomePage extends BaseComponent {

  renderContent() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 200,
          }}
        >
          Open your Intelligent Life
        </Text>
        <TextButton
          title="Creating Home"
          onPress={() => {
            this.props.navigation.navigate('CreateHomeListPage');
          }}
          style={{ width: 0.4 * width, marginTop: 20 }}
        />
        <ButtonX
          style={{ marginTop: 250 }}
          onPress={() => {
            TuyaUserApi.logout()
              .then(() => {
                this.showToast('退出成功');
                this.props.navigation.dispatch(resetAction('LoginHomePage'));
              })
              .catch((err) => {
                this.showToast(err.toString());
              });
          }}
        >
          <Text style={{ fontSize: 12, color: '#2196F3' }}>Exit</Text>
        </ButtonX>
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
    backgroundColor: '#FFFFFF',
  },
  tips: {
    fontSize: 29,
  },
});
