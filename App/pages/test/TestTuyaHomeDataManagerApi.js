import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaHomeDataManagerApi ,TuyaHomeManagerApi} from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';
import EmptyView from '../../common/EmptyView';


import Item from '../../common/Item'

export default class TestUserApiPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state={
            content:''
        }
        this.state = {
            home: null,
            groupList:[],
            devList:[],
            roomList:[],
            devRespBean:[],
            product:null
        }
        TuyaHomeManagerApi.queryHomeList()
            .then((data) => {
                if (data.length !== 0) {
                    this.setState({
                        home: data[0],
                    });
                }
            })
    }


    getList() {
        const homeId = this.state.home.homeId
        return [
            {
                key: 'getHomeRoomList',
                leftText: 'getHomeRoomList',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeDataManagerApi.getHomeRoomList({homeId}).then(data => {
                        this.setState({ content: JSON.stringify(data) ,roomList:data})
                    })
                }
            },
            {
                key: 'getHomeDeviceList',
                leftText: 'getHomeDeviceList',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeDataManagerApi.getHomeDeviceList({homeId}).then(data => {
                        this.setState({ content: JSON.stringify(data),devList:data })
                    })
                }
            },
            {
                key: 'getHomeGroupList',
                leftText: 'getHomeGroupList',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeDataManagerApi.getHomeGroupList({homeId}).then(data => {
                        this.setState({ content: JSON.stringify(data),groupList:data })
                    })
                }
            },
            {
                key: 'getGroupBean',
                leftText: 'getGroupBean',
                rightText: 'click',
                onPress: () => {
                    if(this.state.groupList.length>0){
                        TuyaHomeDataManagerApi.getGroupBean({
                            groupId:this.state.groupList[0].id
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getDeviceBean',
                leftText: 'getDeviceBean',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        TuyaHomeDataManagerApi.getDeviceBean({
                            devId:this.state.devList[0].devId
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getGroupRoomBean',
                leftText: 'getGroupRoomBean',
                rightText: 'click',
                onPress: () => {
                    if(this.state.groupList.length>0){
                        TuyaHomeDataManagerApi.getGroupRoomBean({
                            groupId:this.state.groupList[0].id
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getRoomBean',
                leftText: 'getRoomBean',
                rightText: 'click',
                onPress: () => {
                    if(this.state.roomList.length>0){
                        TuyaHomeDataManagerApi.getRoomBean({
                            roomId:this.state.roomList[0].roomId,
                            homeId
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getDeviceRoomBean',
                leftText: 'getDeviceRoomBean',
                rightText: 'click',
                onPress: () => {
                    if(this.state.roomList.length>0){
                        TuyaHomeDataManagerApi.getDeviceRoomBean({
                            devId:this.state.devList[0].devId
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getGroupDeviceList',
                leftText: 'getGroupDeviceList',
                rightText: 'click',
                onPress: () => {
                    if(this.state.groupList.length>0){
                        TuyaHomeDataManagerApi.getGroupDeviceList({
                            groupId:this.state.groupList[0].id
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getMeshGroupList',
                leftText: 'getMeshGroupList',
                rightText: 'click',
                onPress: () => {
                    if(this.state.groupList.length>0){
                        TuyaHomeDataManagerApi.getMeshGroupList({
                            groupId:this.state.groupList[0].id
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getMeshDeviceList',
                leftText: 'getMeshDeviceList',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeDataManagerApi.getMeshDeviceList({
                        meshId:''
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                }
            },
            {
                key: 'getRoomDeviceList',
                leftText: 'getRoomDeviceList',
                rightText: 'click',
                onPress: () => {
                    if(this.state.roomList.length>0){
                        TuyaHomeDataManagerApi.getRoomDeviceList({
                            roomId:this.state.roomList[0].roomId
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getRoomGroupList',
                leftText: 'getRoomGroupList',
                rightText: 'click',
                onPress: () => {
                    if(this.state.roomList.length>0){
                        TuyaHomeDataManagerApi.getRoomGroupList({
                            roomId:this.state.roomList[0].roomId
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getHomeBean',
                leftText: 'getHomeBean',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeDataManagerApi.getHomeBean({
                       homeId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                }
            },
            {
                key: 'getSubDeviceBean',
                leftText: 'getSubDeviceBean',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        TuyaHomeDataManagerApi.getSubDeviceBean({
                            devId:this.state.devList[0].devId
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getSubDeviceBeanByNodeId',
                leftText: 'getSubDeviceBeanByNodeId',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        TuyaHomeDataManagerApi.getSubDeviceBeanByNodeId({
                            devId:this.state.devList[0].devId,
                            nodeId:''
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getProductBean',
                leftText: 'getProductBean',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        TuyaHomeDataManagerApi.getProductBean({
                            productId:this.state.devList[0].productId,
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data),product:data })
                        })
                    }
                }
            },
            {
                key: 'getDp',
                leftText: 'getDp',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        const dpId=""
                        TuyaHomeDataManagerApi.getDp({
                            devId:this.state.devList[0].devId,
                            dpId
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getDps',
                leftText: 'getDps',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        TuyaHomeDataManagerApi.getDps({
                            devId:this.state.devList[0].devId,
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getSchema',
                leftText: 'getSchema',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        TuyaHomeDataManagerApi.getSchema({
                            devId:this.state.devList[0].devId,
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'queryDev',
                leftText: 'queryDev',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        TuyaHomeDataManagerApi.queryDev({
                            devId:this.state.devList[0].devId,
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'discoveredLanDevice',
                leftText: 'discoveredLanDevice',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeDataManagerApi.discoveredLanDevice(()=>{

                    })
                }
            },
            {
                key: 'unRegisterDiscoveredLanDeviceListener',
                leftText: 'unRegisterDiscoveredLanDeviceListener',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeDataManagerApi.unRegisterDiscoveredLanDeviceListener()
                }
            },
            {
                key: 'querySubDev',
                leftText: 'querySubDev',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        const meshId=''
                        TuyaHomeDataManagerApi.querySubDev({
                            devId:this.state.devList[0].devId,
                            meshId
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getDevRespBean',
                leftText: 'getDevRespBean',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        TuyaHomeDataManagerApi.getDevRespBean({
                            devId:this.state.devList[0].devId,
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getSubDevRespBean',
                leftText: 'getSubDevRespBean',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        const meshId=''
                        const nodeId=''
                        TuyaHomeDataManagerApi.getSubDevRespBean({
                            meshId,
                            nodeId
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
            {
                key: 'getDevRespBeanList',
                leftText: 'getDevRespBeanList',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        TuyaHomeDataManagerApi.getDevRespBeanList().then(data => {
                            this.setState({ content: JSON.stringify(data),devRespBean:data })
                        })
                    }
                }
            },
            {
                key: 'addDevRespList',
                leftText: 'addDevRespList',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        TuyaHomeDataManagerApi.addDevRespList({
                            list:this.state.devRespBean
                        })
                    }
                }
            },
            {
                key: 'addProductList',
                leftText: 'addProductList',
                rightText: 'click',
                onPress: () => {
                    if(this.state.product){
                        TuyaHomeDataManagerApi.addProductList({
                            list:[this.state.product]
                        })
                    }
                }
            },
            {
                key: 'getSubDevList',
                leftText: 'getSubDevList',
                rightText: 'click',
                onPress: () => {
                    if(this.state.devList.length>0){
                        TuyaHomeDataManagerApi.getSubDevList({
                            devId:this.state.devList[0].devId,
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                    }
                }
            },
        ]
    }
    renderHeaderView() {
        return <HeadView leftOnPress={() => this.props.navigation.pop()} centerText={'TestApi'} />
    }
    renderContent() {
        if (this.state.home == null) {
            return <EmptyView text={'create Home'} />
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
