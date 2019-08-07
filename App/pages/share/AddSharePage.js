import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { TuyaShareApi } from '../../../sdk'
import BaseComponent from '../../common/BaseComponent'
import HeadView from '../../common/HeadView'
import Item from '../../common/Item'
import EditItem from '../../common/EditItem'

import { countryCode, userName } from '../../constant'

const { width } = Dimensions.get('window');

const Res = {
  arrowRight: require('../../res/images/Arrow_right.png'),
};

export default class AddSharePage extends BaseComponent {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      homeId: params.homeId,
      devIds: [params.devId],
      countryCode,
      userName
    };
  }

  renderHeaderView() {
    return <HeadView
      leftOnPress={() => this.props.navigation.pop()}
      centerText={'add a share'}
      rightVisable={true}
      rightText={'share'}
      rightOnPress={() => {
        TuyaShareApi.addShareWithHomeId({
          homeId: this.state.homeId,
          countryCode: this.state.countryCode,
          userAccount: this.state.userName,
          devIds: this.state.devIds,
        })
          .then(() => {
            this.showToast('success');
            this.props.navigation.pop();
          })
          .catch((err) => {
            this.showToast(err.toString());
          });
      }}
    />
  }

  renderContent() {
    return (
      <View style={styles.container}>
        <EditItem leftText={'Country/region'} value={this.state.countryCode} onChangeText={(countryCode) => {
          this.setState({
            countryCode
          })
        }} />
        <EditItem leftText={'userName'} value={this.state.userName} onChangeText={(userName) => {
          this.setState({
            userName
          })
        }} />
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
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
  tips: {
    fontSize: 29,
  },
  itemStyle: {
    width,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
  },
  textInputStyle: {
    fontSize: 18,
    color: 'black',
    width: width * 0.8,
    borderColor: 'gray',
    height: 56,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
