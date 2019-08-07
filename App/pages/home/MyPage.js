import React from 'react';
import {
  View, StyleSheet, Dimensions,
} from 'react-native';
import { TuyaUserApi } from '../../../sdk'
import { resetAction } from '../../navigations/AppNavigator';
import ButtonX from '../../common/ButtonX';
import BaseComponent from '../../common/BaseComponent';
import InputDialog from '../../common/InputDialog';
import PickeWheelX from '../../common/PickeWheelX'

import EmptyView from '../../common/EmptyView'
import Item from '../../common/Item'
const { width } = Dimensions.get('window');

export default class MyPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
    this.getUser()
  }

  getUser() {
    TuyaUserApi.getUser()
      .then((data) => {
        if (data) {
          this.setState({
            user: data,
          });
        }
      })
  }
  logout() {
    TuyaUserApi.logout()
      .then(() => {
        this.props.navigation.dispatch(resetAction('LoginHomePage'));
      })
      .catch(() => {
        this.props.navigation.dispatch(resetAction('LoginHomePage'));
      });
  }


  getList() {
    return [
      {
        key: 'Account',
        leftText: 'Account',
        rightText: this.state.user.username,
      },
      {
        key: 'nickName',
        leftText: 'nickName',
        rightText: this.state.user.nickName,
        onPress: () => {
          this.inputDialog &&
            this.inputDialog.show({
              title: 'rename',
              value: this.state.user.nickName || '',
              confim: (name) => {
                TuyaUserApi.reRickName({ name }).then(() => this.getUser())
              },
            })
        }
      },
      {
        key: 'TempUnit',
        leftText: ' TempUnit',
        rightText: this.state.user.tempUnit == 1 ? 'Celsius' : 'Fahrenheit',
        onPress: () => {
          const list = ['Celsius', 'Fahrenheit']
          this.pickeWheelX &&
            this.pickeWheelX.show(this.state.user.tempUnit - 1, list, (index) => {
              TuyaUserApi.setTempUnit({ tempUnitEnum: list[index]}).then(() => this.getUser())
            })
        }
      },
      {
        key: 'timezoneId',
        leftText: 'timezoneId',
        rightText: this.state.user.timezoneId,
      },
      {
        key: 'TestApi',
        leftText: 'TestApi',
        rightText: '',
        onPress: () => {
          this.props.navigation.navigate('TestApiPage')
        }
      },
    ]
  }
  renderContent() {
    if (!this.state.user) return <EmptyView text={'user is null'} />
    return (
      <View style={styles.container}>
        {
          this.getList().map(d => <Item {...d} />)
        }
        <ButtonX
          style={{
            backgroundColor: '#FFFFFF',
            width,
            height: 50,
            justifyContent:'center',
            marginTop: 50,
          }}
          text="退出登陆"
          onPress={() => {
            this.logout();
          }}
          textStyle={{ color: '#A2A3AA' }}
        />
      </View>
    );
  }
  renderExpendView() {
    return <View>
      <InputDialog ref={ref => (this.inputDialog = ref)} />
      <PickeWheelX
        ref={(ref) => {
          this.pickeWheelX = ref
        }}
      />
    </View>
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
    marginTop: 50
  },
});
