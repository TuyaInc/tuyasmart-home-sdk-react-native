import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  DeviceEventEmitter,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import Item from '../../common/Item'
import { TuyaSceneApi } from '../../../sdk'
import HeadView from '../../common/HeadView'
import BaseComponent from '../../common/BaseComponent'

const { width } = Dimensions.get('window');

class ScenePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      sceneList: [],
      conditionList: [],
      homeId: this.props.homeId,
    };
  }

  getData() {
    TuyaSceneApi.getSceneList({ homeId: this.state.homeId })
      .then((data) => {
        const SceneList = [];
        const conditionList = [];
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
  }
  componentDidMount() {
    this.setHomeIdListener = DeviceEventEmitter.addListener('setHomeId', (value) => {
      this.setState({ homeId: value }, () => this.getData())
    });
    this.getData()
  }

  componentWillUnmount() {
    this.setHomeIdListener && this.setHomeIdListener.remove();
  }

  _renderItem(item) {
    return (
      <TouchableOpacity onPress={() => {
        TuyaSceneApi.executeScene({ sceneId: item.id })
      }}>
        <View>
          <Image
            style={{
              height: 120,
              width: 163,
              marginLeft: 10,
              marginTop: 5,
              borderRadius: 8,
            }}
            resizeMode="stretch"
            source={{ uri: item.background }}
          />
          <Text style={{ position: 'absolute', left: 10, top: 10, color: 'black' }}>{item.name}</Text>
        </View>
      </TouchableOpacity>

    )
  }

  renderHeaderView() {
    return <HeadView
      centerText={'scene'}
      leftText={'delete'}
      leftOnPress={() => { this.props.navigation.navigate('DeleteScenePage'); }}
      rightText={'add scene'}
      rightVisable={true}
      rightOnPress={() => {
        this.props.navigation.navigate('sceneHomePage');
      }}
    />
  }
  renderContent() {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={(
            <RefreshControl
              onRefresh={() => { this.getData() }}
              refreshing={false}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          )}
        >
          <Item leftText={'scene'} />
          <FlatList
            data={this.state.sceneList}
            renderItem={({ item }) => this._renderItem(item)}
            style={{ width, flex: 1 }}
            numColumns={2}
          />
          <Item leftText={'automation'} />
          <FlatList
            data={this.state.conditionList}
            renderItem={({ item }) => this._renderItem(item)}
          />
        </ScrollView >
      </View >
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
});
export default connect((state) => ({
  homeId: state.reducers.homeId,
}))(ScenePage)