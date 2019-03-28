import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Switch,
  ScrollView,
  DeviceEventEmitter,
  Modal,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ButtonX from '../../standard/components/buttonX';
import TuyaSceneApi from '../../api/TuyaSceneApi';
import NormalDialog from '../../component/NormalDialog';

const { height, width } = Dimensions.get('window');
const Res = {
  arrow_down: require('../../res/images/arrow_down.png'),
};
export default class ScenePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSceneListShow: false,
      isAutoListShow: false,
      sceneList: [],
      conditionList: [],
      homeId: '',
      isDialogShow: false,
      dialogText: '',
      dialogActions: [],
    };
  }

  componentDidMount() {
    console.log('--->', this.state.homeId.length);

    this.setHomeIdListener = DeviceEventEmitter.addListener('setHomeId', (value) => {
      console.warn('--->value', value);
    });

    TuyaSceneApi.getSceneList({ homeId: 2040920 })
      .then((data) => {
        console.log('-getSceneList--->', data);
        const SceneList = new Array();
        const conditionList = new Array();
        for (let i = 0, j = data.length; i < j; i++) {
          if (data[i].conditions != undefined) {
            conditionList.push(data[i]);
          } else {
            SceneList.push(data[i]);
          }
        }
        this.setState({
          sceneList: SceneList,
          conditionList,
        });
      })
      .catch((err) => {
        console.log('---getSceneList->', err);
      });
  }

  componentWillUnmount() {
    this.setHomeIdListener && this.setHomeIdListener.remove();
  }

  renderLeftButton(name) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('DeleteScenePage');
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

  renderRightButton() {
    return (
      <TouchableOpacity
        style={{ width: 30, height: 25 }}
        onPress={() => {
          this.props.navigation.navigate('sceneHomePage');
        }}
      >
        <Image source={require('../../res/images/ic_add.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    );
  }

  _renderConditionItem(data) {
    return (
      <View
        style={{
          width,
          height: 140,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 8,
        }}
      >
        <ImageBackground
          style={{ width: 0.85 * width, height: 140, borderRadius: 8 }}
          resizeMode="stretch"
          source={{ uri: data.item.background }}
        >
          <View
            style={{
              height: 140,
              width: 0.85 * width,
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#FFFFFF',
                marginTop: 10,
                marginLeft: 10,
                fontWeight: 'bold',
              }}
            >
              {data.item.name}
            </Text>
            <Switch
              style={{
                fontWeight: 'bold',
                position: 'absolute',
                right: 10,
                bottom: 10,
              }}
              value={data.item.enabled}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }

  render() {
    const sceneList = this.state.isSceneListShow ? (
      <FlatList
        data={this.state.sceneList}
        // data={[{ title: 'aaa' }, { title: 'bbb' }]}
        renderItem={({ item }) => (
          <ImageBackground
            style={{
              height: 120,
              width: 163,
              marginLeft: 10,
              marginTop: 5,
              borderRadius: 8,
            }}
            resizeMode="stretch"
            source={{ uri: item.background }}
          >
            <TouchableOpacity
              onPress={() => {
                console.warn('--->diandiandi');
                this.setState({
                  isDialogShow: true,
                  dialogText: item.name,
                  dialogActions: item.actions,
                });
              }}
            >
              <View
                style={{
                  height: 120,
                  width: 163,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                    marginTop: 10,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}
                >
                  {item.name}
                </Text>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                    width: 30,
                  }}
                  onPress={() => {
                    console.warn('---->Zz');
                    this.props.navigation.navigate('AddScenePage', {
                      item,
                      isEdit: true,
                    });
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: '#FFFFFF',
                    }}
                  >
                      ...
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        )}
        style={{ width, flex: 1 }}
        // horizontal={true}
        numColumns={2}
      />
    ) : null;
    const isAutoList = this.state.isAutoListShow ? (
      <FlatList
        data={this.state.conditionList}
        // data={[{ title: 'aaa' }, { title: 'bbb' }]}
        renderItem={this._renderConditionItem}
        style={{ width }}
      />
    ) : null;

    return (
      <View style={styles.container}>
        <ScrollView>
          <NavigationBar
            style={{ backgroundColor: '#FFFFFF', width }}
            leftButton={this.renderLeftButton('编辑', this.props)}
            rightButton={this.renderRightButton()}
            title="智能"
          />
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isSceneListShow: !this.state.isSceneListShow,
              });
            }}
          >
            <View style={styles.btnStyle}>
              <Text>场景</Text>
              <Image
                source={Res.arrow_down}
                style={this.state.isSceneListShow ? {} : { transform: [{ rotate: '-90deg' }] }}
              />
            </View>
          </TouchableOpacity>
          {sceneList}
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isAutoListShow: !this.state.isAutoListShow,
              });
            }}
          >
            <View style={styles.btnStyle}>
              <Text>自动化</Text>
              <Image
                source={Res.arrow_down}
                style={this.state.isAutoListShow ? {} : { transform: [{ rotate: '-90deg' }] }}
              />
            </View>
          </TouchableOpacity>
          {isAutoList}
        </ScrollView>
        {this.state.isDialogShow && (
          <Modal
            animationType="slide"
            transparent
            visible
            onRequestClose={() => {
              this.setState({
                isDialogShow: false,
              });
            }}
          >
            <View style={styles.allview}>
              <View style={styles.halfview}>
                <View
                  style={{
                    width: 0.8 * width,
                    backgroundColor: 'transparent',
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#22242C',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    {this.state.dialogText}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={this.state.dialogActions}
                    renderItem={({ item }) => {
                      let newArr;
                      for (const i in item.actionDisplayNew) {
                        newArr = item.actionDisplayNew[i];
                      }
                      return (
                        <View style={{ width: 0.8 * width, flexDirection: 'row' }}>
                          <Text style={{ color: 'black', fontSize: 16 }}>{item.entityName}</Text>
                          <Text style={{ color: 'black', fontSize: 16, marginLeft: 10 }}>{newArr[0]}</Text>
                          <Text style={{ color: 'black', fontSize: 16 }}>{newArr[1]}</Text>
                        </View>
                      );
                    }}
                  />
                </View>
                <View
                  style={{
                    width,
                    height: 56,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                >
                  <TouchableOpacity
                    style={styles.comfirmbtn}
                    onPress={() => {
                      this.setState({
                        isDialogShow: false,
                      });
                    }}
                  >
                    <Text style={styles.comfirmText}>确认</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
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
    backgroundColor: '#F8F8F8',
  },
  tips: {
    fontSize: 29,
  },
  btnStyle: {
    width,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingLeft: 15,
    paddingRight: 15,
  },
  allview: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfview: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: height * 0.4,
    height: 0.3 * height,
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderRadius: 16,
  },
  cancelbtn: {
    width: width * 0.8 / 2,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: 'transparent',
  },
  comfirmbtn: {
    width: width * 0.8,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: 'transparent',
  },
  cancelText: {
    fontSize: 15,
    color: '#22242C',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  comfirmText: {
    fontSize: 15,
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInputStyle: {
    fontSize: 15,
    color: '#666666',
    width: width * 0.8,
    borderColor: 'gray',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 4,
    textAlign: 'center',
  },
});
