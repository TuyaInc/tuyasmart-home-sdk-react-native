import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ImageBackground, Dimensions, FlatList, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import ViewUtils from '../../utils/ViewUtils';
import TuyaShareApi from '../../api/TuyaShareApi';
import TuyaHomeApi from '../../api/TuyaHomeApi';
import TuyaGroupApi from '../../api/TuyaGroupApi';
import EditDialog from '../../component/EditDialog';

const { height, width } = Dimensions.get('window');

const Res = {
  choose: require('../../res/images/choose.png'),
  choose_un: require('../../res/images/choose_un.png'),
};

class GroupPage extends Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    console.log('share params', params);
    this.state = {
      homeId: params.homeId,
      devLists: [],
      devId: params.devId,
      productId: params.productId,
      editVisible: false,
      nameValue: '',
      chooseDevids: [],
    };
  }

  componentDidMount() {
    console.log('-->this.state', this.state.productId);
    TuyaHomeApi.getHomeDetail({
      homeId: this.state.homeId,
    })
      .then((data) => {
        const deviceList = data.deviceList;
        const productList = new Array();
        for (let i = 0, j = deviceList.length; i < j; i++) {
          if (deviceList[i].productId == this.state.productId) {
            productList.push(deviceList[i]);
          }
        }
        for (let i = 0, j = productList.length; i < j; i++) {
          console.log('-----------------');
          productList[i].isChoose = false;
        }

        console.log('--->productList', productList);
        this.setState({
          devLists: productList,
        });
      })
      .catch((err) => {});
  }

  _renderRightBtn(name) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('--->this.state', this.state.devLists);
          const data = this.state.devLists;
          const chooseList = new Array();
          for (let i = 0, j = data.length; i < j; i++) {
            if (data[i].isChoose === true) {
              chooseList.push(data[i].devId);
            }
          }
          this.setState({
            editVisible: true,
            chooseDevids: chooseList,
          });
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: 'black',
            marginRight: 15,
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{ backgroundColor: '#FFFFFF', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop();
          })}
          rightButton={this._renderRightBtn('保存')}
          title="共享设备"
        />
        <View
          style={{
            backgroundColor: 'yellow',
            alignItems: 'center',
            justifyContent: 'center',
            width,
            height: 50,
          }}
        >
          <Text
            style={{
              color: '#22232C',
              fontSize: 13,
              marginLeft: 10,
              marginTop: 8,
            }}
          >
            新建群组成功后将实现同步控制
          </Text>
        </View>
        <FlatList
          data={this.state.devLists}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                const data = this.state.devLists;
                data[index].isChoose = !data[index].isChoose;
                console.log('--> data[index].isChoose', data[index].isChoose);
                this.setState({
                  devLists: data,
                });
              }}
            >
              <View style={styles.itemStyle}>
                <Image
                  source={{ uri: item.iconUrl }}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'stretch',
                    marginLeft: 20,
                  }}
                />
                <Text style={{ color: 'black', fontSize: 16 }}>{item.name}</Text>
                <Image
                  source={item.isChoose ? Res.choose : Res.choose_un}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'stretch',
                    marginRight: 20,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
        <EditDialog
          title="编辑名称"
          visible={this.state.editVisible}
          textValue={(value) => {
            this.setState({
              nameValue: value,
            });
          }}
          save={() => {
            // this.setState({
            //   name: this.state.nameValue,
            //   editVisible: false
            // });
            const name = this.state.nameValue;
            TuyaGroupApi.createGroup({
              homeId: this.state.homeId,
              productId: this.state.productId,
              name: this.state.nameValue,
              devIds: this.state.chooseDevids,
            })
              .then((data) => {})
              .catch((err) => {});
          }}
          cancel={() => {
            this.setState({
              editVisible: false,
            });
          }}
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
  tips: {
    fontSize: 29,
  },
  itemStyle: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 1,
    marginLeft: 8,
    marginRight: 8,
    width,
    backgroundColor: '#FFFFFF',
  },
});

export default connect(state => ({
  ...state,
}))(GroupPage);
