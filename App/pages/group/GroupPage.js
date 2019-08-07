import React from 'react';
import {
  View, StyleSheet, Text, Image, Dimensions, FlatList, 
} from 'react-native';
import { connect } from 'react-redux';
import { TuyaHomeApi, TuyaGroupApi } from '../../../sdk'
import HeadView from '../../common/HeadView';
import BaseComponet from '../../common/BaseComponent';
import CenterItem from '../../common/CenterItem';
import {groupName} from '../../constant'


const { width } = Dimensions.get('window');



class GroupPage extends BaseComponet {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      homeId: params.homeId,
      devLists: [],
      devId: params.devId,
      productId: params.productId,
    };
  }

  componentDidMount() {
    TuyaHomeApi.getHomeDetail({
      homeId: this.state.homeId,
    })
      .then((data) => {
        const deviceList = data.deviceList;
        const list = new Array();
        for (let i = 0, j = deviceList.length; i < j; i++) {
          if (deviceList[i].productId == this.state.productId) {
            list.push(deviceList[i]);
          }
        }
        this.setState({
          devLists: list,
        });
      })
  }

  renderHeaderView() {
    return <HeadView
      centerText={'Create group'}
      leftOnPress={() => this.props.navigation.pop()}
      rightText={'save'}
      rightVisable={true}
      rightOnPress={() => {
        const list=[]
        this.state.devLists.forEach(e=>list.push(e.devId))
        TuyaHomeApi.createGroup({
          homeId: this.state.homeId,
          productId: this.state.productId,
          name: groupName,
          devIdList:list,
        })
          .then(() => {
            this.showToast('success')
            this.props.navigation.pop()
          })
          .catch((err) => { 
            this.showToast(err.toString())
          });
      }}
    />
  }

  renderContent() {
    return (
      <View style={styles.container}>
        <CenterItem
          text={'Synchronization control will be realized after the success of the new group'}
          style={{ backgroundColor: 'yellow' }}
        />
        <FlatList
          data={this.state.devLists}
          renderItem={({ item }) => (
            <View style={styles.itemStyle}>
              <Image
                source={{ uri: item.iconUrl }}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'stretch',
                }}
              />
              <Text style={{ color: 'black', fontSize: 16 }}>{item.name}</Text>
            </View>
          )}
        />
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
  itemStyle: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 1,
    paddingLeft:16,
    paddingRight: 16,
    width,
    backgroundColor: '#FFFFFF',
  },
});

export default connect(state => ({
  ...state,
}))(GroupPage);
