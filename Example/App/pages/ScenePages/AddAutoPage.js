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
  cloud: require('../../res/images/cloud.png'),
  humidity: require('../../res/images/humidity.png'),
  sunsetrise: require('../../res/images/sunsetrise.png'),
};

export default class AddAutoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onTop: true,
      ActionList: [],
      editVisible: false,
      nameValue: '',
      name: '编辑名称',
      ConditionList: [],
    };
  }

  componentWillMount() {
    DeviceStorage.get('Action')
      .then((data) => {
        this.setState({
          ActionList: data,
        });
      })
      .catch((err) => {
        console.log('--->Err', err);
      });
    DeviceStorage.get('Condition')
      .then((data) => {
        console.log('-->device condition', data);
        this.setState({
          ConditionList: data,
        });
      })
      .catch((err) => {
        console.log('--->Err', err);
      });
  }

  renderLeftButton(name) {
    return (
      <TouchableOpacity
        onPress={() => {
          DeviceStorage.delete('Action');
          DeviceStorage.delete('Condition');
          this.setState({
            ActionList: [],
            ConditionList: [],
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
          console.log('---->this.state', this.state.ConditionList);
          console.log('--this.stateddd', this.state.ActionList);
          if (this.state.ActionList.length > 0) {
            const ActionLists = this.state.ActionList;
            const devLists = new Array();
            const conditionList = this.state.ConditionList;
            for (let i = 0, j = ActionLists.length; i < j; i++) {
              devLists.push(ActionLists[i].devId);
            }
            TuyaSceneApi.createAutoScene({
              homeId: 2040920,
              name: this.state.name,
              stickyOnTop: false,
              devIds: devLists,
              background: 'https://images.tuyacn.com/smart/rule/cover/bedroom.png',
              matchType: 'MATCH_TYPE_OR',
              tasks: ActionLists,
              conditionList: this.state.ConditionList,
            })
              .then((data) => {
                console.log('--->data', data);
                DeviceStorage.delete('Action');
                DeviceStorage.delete('Condition');
                this.setState({
                  ActionList: [],
                  ConditionList: [],
                });
                this.props.navigation.navigate('HomePage');
              })
              .catch((err) => {
                console.log('-->err', err);
              });
          } else {
            // 未添加动作
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
            isFromScene: false,
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

  _renderConditionFooter() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('ConditionListPage');
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
          <Text style={{ color: '#A2A3AA', fontSize: 13 }}>添加执行条件</Text>
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

  _renderConditionItem(data) {
    console.log('----->_renderConditionItem', data);
    let text = '';
    if (data.item.type == 'temp') {
      text = `${data.item.range} ` + ':' + ` ${data.item.rule}`;
      console.log('---->data.range', data.item.range);
    } else {
      console.log('---->data.rule', data.item.rule);
      text = data.item.rule;
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemConditionStyle}
        onPress={() => {
          console.log('--->data.item', data.item);
        }}
      >
        <Image style={{ height: 20, width: 20, resizeMode: 'stretch' }} source={Res.cloud} />
        <View
          style={{
            flex: 1,
            width: 60,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              flex: 1,
            }}
          >
            {data.item.localCity}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              flex: 1,
            }}
          >
            {text}
          </Text>
        </View>
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
              newArr.push(data[i].dpId);
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
            <Text style={{ color: '#22242C', fontSize: 14 }}>当满足以下某一条件时</Text>
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
                this.props.navigation.navigate('ConditionListPage');
              }}
            >
              <Text style={{ fontSize: 16, color: '#FFFFFF' }}>+</Text>
            </TouchableOpacity>
          </View>
          <SwipeableFlatList
            data={this.state.ConditionList}
            ref={(ref) => {
              this._flatListRef = ref;
            }}
            renderItem={this._renderConditionItem}
            style={{ width }}
            renderQuickActions={({ item }) => this.getQuickActions(item)} // 创建侧滑菜单
            maxSwipeDistance={80} // 可展开（滑动）的距离
            bounceFirstRowOnMount // 进去的时候不展示侧滑效果
            ListEmptyComponent={this._renderConditionFooter(this.props)}
          />
        </View>
        <View
          style={{
            width: 0.95 * width,
            height: 80,
            backgroundColor: '#FFFFFF',
            marginTop: 30,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
              width: 0.95 * width,
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
                  isFromScene: false,
                });
              }}
            >
              <Text style={{ fontSize: 16, color: '#FFFFFF' }}>+</Text>
            </TouchableOpacity>
          </View>
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
  itemConditionStyle: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 1,
    marginLeft: 8,
    marginRight: 8,
    width,
    backgroundColor: '#FFFFFF',
  },
});
