import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaHomeDataManagerApi, TuyaHomeManagerApi,TuyaRoomApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';
import EmptyView from '../../common/EmptyView';


import Item from '../../common/Item'

export default class TestTuyaRoomApiPage extends BaseComponent {
    constructor(props) {
        super(props);
        TuyaHomeManagerApi.queryHomeList()
            .then((data) => {
                if (data.length !== 0) {
                    TuyaHomeDataManagerApi.getHomeRoomList({ homeId: data[0].homeId }).then(roomList => this.setState({ roomList }))
                    TuyaHomeDataManagerApi.getHomeDeviceList({homeId: data[0].homeId}).then(devList=>this.setState({devList}))
                    TuyaHomeDataManagerApi.getHomeGroupList({homeId: data[0].homeId}).then(groupList=>this.setState({groupList}))
                }
            })
        this.state = {
            roomList: [],
            devList:[],
            groupList:[]
        }
    }


    getList() {
        let roomId=''
        if(this.state.roomList.length>0){
            roomId=this.state.roomList[0].roomId
        }
        let devId=''
        if(this.state.devList.length>0){
            devId=this.state.devList[0].devId
        }
        let groupId=''
        if(this.state.groupList.length>0){
            groupId=this.state.groupList[0].id
        }
        return [
            {
                key: 'updateRoom',
                leftText: 'updateRoom',
                rightText: 'click',
                onPress: () => {
                    TuyaRoomApi.updateRoom({
                        roomId,
                        name:''
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'addDevice',
                leftText: 'addDevice',
                rightText: 'click',
                onPress: () => {
                    TuyaRoomApi.addDevice({
                        roomId,
                        devId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'addGroup',
                leftText: 'addGroup',
                rightText: 'click',
                onPress: () => {
                    TuyaRoomApi.addGroup({
                        roomId,
                        groupId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'removeDevice',
                leftText: 'removeDevice',
                rightText: 'click',
                onPress: () => {
                    TuyaRoomApi.removeDevice({
                        roomId,
                        devId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'removeGroup',
                leftText: 'removeGroup',
                rightText: 'click',
                onPress: () => {
                    TuyaRoomApi.removeGroup({
                        roomId,
                        groupId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'moveDevGroupListFromRoom',
                leftText: 'moveDevGroupListFromRoom',
                rightText: 'click',
                onPress: () => {
                    TuyaRoomApi.moveDevGroupListFromRoom({
                        roomId,
                        list:[]
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'sortDevInRoom',
                leftText: 'sortDevInRoom',
                rightText: 'click',
                onPress: () => {
                    TuyaRoomApi.sortDevInRoom({
                        roomId,
                        list:[]
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
        ]
    }
    renderHeaderView() {
        return <HeadView leftOnPress={() => this.props.navigation.pop()} centerText={'TestApi'} />
    }
    renderContent() {
        if (this.state.devList.length==0) {
            return <EmptyView text={'add Device'} />
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    {
                        this.getList().map(d => <Item {...d} />)
                    }
                    <View style={{ justifyContent: 'center', alignItems: 'center', margin: 100 }}>
                        {
                            this.state.content != '' &&
                            <Text style={styles.text}>{this.state.content}</Text>
                        }
                    </View>
                </View>
            </ScrollView>

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
        backgroundColor: 'white'
    },
    text: {
        color: 'black',
        textAlign: 'center'
    }
});
