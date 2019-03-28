import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Switch,
  FlatList,
  SwipeableFlatList,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import { resetAction } from '../../navigations/AppNavigator';
import TuyaUserApi from '../../api/TuyaUserApi';
import DeviceStorage from '../../utils/DeviceStorage';
import TextButton from '../../component/TextButton';
import Strings from '../../i18n';
import TuyaSceneApi from '../../api/TuyaSceneApi';
import EditDialog from '../../component/EditDialog';

const { height, width } = Dimensions.get('window');
const Res = {
  scenebg: require('../../res/images/scenebg.png'),
  redAdd: require('../../res/images/red_add.png'),
  picTake: require('../../res/images/pic_take.png'),
  pen: require('../../res/images/pen.png'),
  trash: require('../../res/images/trash.png'),
};

export default class AddScenePage extends Component {
  constructor(props) {
    super(props);

    const params = this.props.navigation.state.params;

    console.log('--->params add Scene', params);

    this.state = {
      onTop: true,
      ActionList: [],
      editVisible: false,
      nameValue: '',
      name: '编辑名称',
      isEdit: params.isEdit, // 是否从已有的点击去编辑
      item: params.item,
      sceneId: params.item.id,
    };
  }

  componentWillMount() {
    console.log('---->isEdit', this.state.isEdit);
    if (this.state.isEdit) {
      // 如果是true 就是跳编辑页面
      const newArr = new Array();
      const item = this.state.item;
      const data = this.state.item.actions;
      for (let i = 0, j = data.length; i < j; i++) {
        const actionDisplayNew = data[i].actionDisplayNew;
        let status;
        let key;
        let value;
        for (const c in actionDisplayNew) {
          key = c;
          status = actionDisplayNew[c];
        }
        if (status[1] == 'on' || status[1] == '开') {
          value = true;
        } else {
          value = false;
        }
        console.log('--->status', status);
        const action = {
          devId: data[i].entityId,
          devName: data[i].entityName,
          dpId: parseInt(key),
          dpName: status[0],
          value,
        };
        newArr.push(action);
      }
      DeviceStorage.save('Action', newArr);
      console.log('Action', newArr);
      this.setState({
        ActionList: newArr,
      });
    } else {
      DeviceStorage.get('Action')
        .then((data) => {
          console.log('--->Action', data);
          this.setState({
            ActionList: data,
          });
        })
        .catch((err) => {
          console.log('--->Err', err);
        });
    }
  }

  renderLeftButton(name) {
    return (
      <TouchableOpacity
        onPress={() => {
          DeviceStorage.delete('Action');
          this.setState({
            ActionList: [],
          });
          this.props.navigation.navigate('HomePage');
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: 'black',
            marginLeft: 15,
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  renderRightButton(name) {
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.state.isEdit) {
            const ActionLists = this.state.ActionList;
            var devLists = new Array();
            for (let i = 0, j = ActionLists.length; i < j; i++) {
              devLists.push(ActionLists[i].devId);
            }
            console.log('----->devIds', devLists);
            console.log('------->ActionLists', ActionLists);
            console.log('---->scenId', this.state.sceneId);
            // 编辑调用modify
            TuyaSceneApi.modifyScene({
              homeId: 2040920,
              sceneId: this.state.sceneId,
              name: this.state.name,
              stickyOnTop: false,
              devIds: devLists,
              matchType: 'MATCH_TYPE_OR',
              tasks: ActionLists,
            })
              .then((data) => {
                console.log('--->data', data);
                DeviceStorage.delete('Action');
                this.props.navigation.navigate('HomePage');
              })
              .catch((err) => {
                console.log('-->err', err);
              });
          } else {
            // 第一次创建调用createScene
            if (this.state.ActionList.length > 0) {
              const ActionLists = this.state.ActionList;
              var devLists = new Array();
              for (let i = 0, j = ActionLists.length; i < j; i++) {
                devLists.push(ActionLists[i].devId);
              }
              console.log('----->devIds', devLists);
              console.log('------->tasks', ActionLists);
              TuyaSceneApi.createScene({
                homeId: 2040920,
                name: this.state.name,
                stickyOnTop: false,
                devIds: devLists,
                background: 'https://images.tuyacn.com/smart/rule/cover/bedroom.png',
                matchType: 'MATCH_TYPE_OR',
                tasks: ActionLists,
              })
                .then((data) => {
                  console.log('--->data', data);
                  DeviceStorage.delete('Action');
                  this.props.navigation.navigate('HomePage');
                })
                .catch((err) => {
                  console.log('-->err', err);
                });
            } else {
              // 未添加动作
            }
          }
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

  _renderFooter() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('AddActionPage', {
            isFromScene: true,
          });
        }}
      >
        <View
          style={{
            width,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#A2A3AA', fontSize: 13 }}>添加执行动作</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderItem(data) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemStyle}
        onPress={() => {
          console.log('--->data.item', data.item);
        }}
      >
        <Image style={{ height: 35, width: 35 }} source={Res.picTake} />
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            flex: 1,
            marginLeft: 50,
          }}
        >
          {data.item.dpName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            flex: 1,
            marginRight: 15,
          }}
        >
          {`${data.item.value}`}
        </Text>
      </TouchableOpacity>
    );
  }

  // 侧滑菜单渲染
  getQuickActions = item => (
    <View style={styles.quickAContent}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          const newArr = new Array();
          const data = this.state.ActionList;
          for (let i = 0, j = data.length; i < j; i++) {
            if (data[i].dpId !== item.dpId) {
              newArr.push(data[i]);
            }
          }
          this.setState({
            ActionList: newArr,
          });
          DeviceStorage.save('Action', newArr);
        }}
      >
        <View style={styles.quick}>
          <Text style={styles.delete}>{Strings.delete}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  render() {
    return (
      <View
        style={{
          backgroundColor: '#F4F4F5',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flex: 1,
        }}
      >
        <NavigationBar
          style={{ backgroundColor: '#F4F4F5', width }}
          leftButton={this.renderLeftButton('取消')}
          rightButton={this.renderRightButton('保存')}
        />
        <View
          style={{
            width: 0.95 * width,
            backgroundColor: '#FFFFFF',
            marginTop: 30,
            flexDirection: 'column',
          }}
        >
          <Image source={Res.scenebg} />
          <TouchableOpacity
            style={{
              position: 'absolute',
              width: 200,
              height: 50,
              top: 5,
              left: 10,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            onPress={() => {
              this.setState({
                editVisible: true,
              });
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#FFFFFF',
                marginTop: 5,
                marginLeft: 5,
              }}
            >
              {this.state.name}
            </Text>
            <Image source={Res.pen} style={{ marginTop: 5, marginLeft: 5 }} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <Text style={{ color: '#22242C', fontSize: 14 }}>就执行以下动作</Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                borderRadius: 20,
                height: 22,
                width: 22,
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                this.props.navigation.navigate('AddActionPage', {
                  isFromScene: true,
                });
              }}
            >
              <Text style={{ fontSize: 16, color: '#FFFFFF' }}>+</Text>
            </TouchableOpacity>
          </View>
          {/* <FlatList
            data={this.state.ActionList}
            // data={[{ title: 'aaa' }, { title: 'bbb' }]}
            renderItem={this._renderHomeItem}
            style={{ width: width }}
            ListFooterComponent={this._renderFooter(this.props)}
          /> */}
          <SwipeableFlatList
            data={this.state.ActionList}
            ref={(ref) => {
              this._flatListRef = ref;
            }}
            renderItem={this._renderItem}
            style={{ width }}
            renderQuickActions={({ item }) => this.getQuickActions(item)} // 创建侧滑菜单
            maxSwipeDistance={80} // 可展开（滑动）的距离
            bounceFirstRowOnMount // 进去的时候不展示侧滑效果
            ListEmptyComponent={this._renderFooter(this.props)}
          />
        </View>
        <View
          style={{
            width: 0.95 * width,
            height: 80,
            backgroundColor: '#FFFFFF',
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#22242C', fontSize: 14 }}>出现在首页</Text>
          <Switch
            value={this.state.onTop}
            onValueChange={() => {
              this.setState({
                onTop: !this.state.onTop,
              });
            }}
          />
        </View>
        {this.state.isEdit && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#737270',
              borderRadius: 16,
              width: 107,
              height: 35,
              marginTop: 10,
              marginLeft: 130,
            }}
            onPress={() => {
              console.warn('--->');
              TuyaSceneApi.deleteScene({ sceneId: this.state.sceneId })
                .then((data) => {
                  console.warn('--->deleteScene', data);
                  DeviceStorage.delete('Action');
                  this.setState({
                    ActionList: [],
                  });
                  this.props.navigation.navigate('HomePage');
                })
                .catch((err) => {
                  console.warn((err) => {
                    console.warn('-->err', err);
                  });
                });
            }}
          >
            <Image source={Res.trash} style={{ width: 18, height: 18, marginLeft: 10 }} />
            <Text style={{ fontSize: 14, color: 'white', marginLeft: 10 }}>删除场景</Text>
          </TouchableOpacity>
        )}
        <EditDialog
          title="编辑名称"
          visible={this.state.editVisible}
          textValue={(value) => {
            this.setState({
              nameValue: value,
            });
          }}
          save={() => {
            this.setState({
              name: this.state.nameValue,
              editVisible: false,
            });
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
  delete: {
    color: '#d8fffa',
  },
  quickAContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
    height: 58,
  },
  quick: {
    backgroundColor: 'red',
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 1,
    marginLeft: 8,
    marginRight: 8,
    width,
    backgroundColor: '#FFFFFF',
  },
});
