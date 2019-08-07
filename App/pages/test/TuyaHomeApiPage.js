import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaHomeManagerApi, TuyaHomeApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';
import EmptyView from '../../common/EmptyView';

import { lon, homeName, lat, geoName, } from '../../constant'

import Item from '../../common/Item'

export default class TuyaHomeApiPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            home: null,
            homeList: [],
            content: '',
            rooms: [],
            homeDetail: null
        }
        TuyaHomeManagerApi.queryHomeList()
            .then((data) => {
                if (data.length !== 0) {
                    this.setState({
                        home: data[0],
                        homeList: data,
                        rooms: data[0].rooms
                    }, () => {
                        TuyaHomeApi.getHomeDetail({ homeId: this.state.home.homeId }).then(data => {
                            this.setState(
                                {
                                    homeDetail: data
                                }
                            )
                        })
                    });
                }
            })
    }


    getList() {
        const homeId = this.state.home.homeId
        return [
            {
                key: 'getHomeDetail',
                leftText: 'getHomeDetail',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeApi.getHomeDetail({
                        homeId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'getHomeLocalCache',
                leftText: 'getHomeLocalCache',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeApi.getHomeLocalCache({
                        homeId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'updateHome',
                leftText: 'updateHome',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeApi.updateHome({
                        homeId,
                        name: homeName,
                        lon,
                        lat,
                        geoName
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'sortHome',
                leftText: 'sortHome',
                rightText: 'click',
                onPress: () => {
                    let idList = []
                    this.state.homeList.forEach(data => idList.push(data.homeId))
                    TuyaHomeApi.sortHome({
                        homeId,
                        idList,
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'sortRoom',
                leftText: 'sortRoom',
                rightText: 'click',
                onPress: () => {
                    let idList = []
                    this.state.home.rooms.forEach(data => idList.push(data.roomId))
                    idList.reverse()
                    TuyaHomeApi.sortRoom({
                        homeId,
                        idList,
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'getHomeBean',
                leftText: 'getHomeBean',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeApi.getHomeBean({
                        homeId,
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'queryRoomInfoByDevice',
                leftText: 'queryRoomInfoByDevice',
                rightText: 'click',
                onPress: () => {
                    if (this.state.homeDetail && this.state.homeDetail.deviceList.length > 0) {
                        TuyaHomeApi.queryRoomInfoByDevice({
                            homeId,
                            devices: this.state.homeDetail.deviceList
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        }).catch((error) => {
                            this.showToast(error.toString())
                        })
                    }
                }
            },
            {
                key: 'createBlueMesh',
                leftText: 'createBlueMesh',
                rightText: 'click',
                onPress: () => {
                    let meshId
                    TuyaHomeApi.createBlueMesh({
                        homeId,
                        meshId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'createSigMesh',
                leftText: 'createSigMesh',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeApi.createSigMesh({
                        homeId,
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'queryDeviceListToAddGroup',
                leftText: 'queryDeviceListToAddGroup',
                rightText: 'click',
                onPress: () => {
                    let groupId
                    let productId
                    TuyaHomeApi.queryDeviceListToAddGroup({
                        homeId,
                        groupId,
                        productId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'queryZigbeeDeviceListToAddGroup',
                leftText: 'queryZigbeeDeviceListToAddGroup',
                rightText: 'click',
                onPress: () => {
                    let groupId
                    let productId
                    let parentId
                    TuyaHomeApi.queryZigbeeDeviceListToAddGroup({
                        homeId,
                        groupId,
                        productId,
                        parentId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'queryZigbeeDeviceListToAddGroup',
                leftText: 'queryZigbeeDeviceListToAddGroup',
                rightText: 'click',
                onPress: () => {
                    let groupId
                    let productId
                    let parentId
                    TuyaHomeApi.queryZigbeeDeviceListToAddGroup({
                        homeId,
                        groupId,
                        productId,
                        parentId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'createZigbeeGroup',
                leftText: 'createZigbeeGroup',
                rightText: 'click',
                onPress: () => {
                    let productId
                    let parentId
                    let name
                    let parentType
                    TuyaHomeApi.createZigbeeGroup({
                        homeId,
                        name,
                        parentType,
                        productId,
                        parentId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'queryRoomInfoByGroup',
                leftText: 'queryRoomInfoByGroup',
                rightText: 'click',
                onPress: () => {
                    if (this.state.homeDetail && this.state.homeDetail.deviceList.length > 0) {
                        TuyaHomeApi.queryRoomInfoByGroup({
                            homeId,
                            list: this.state.homeDetail.deviceList
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        }).catch((error) => {
                            this.showToast(error.toString())
                        })
                    }
                }
            },
            {
                key: 'bindNewConfigDevs',
                leftText: 'bindNewConfigDevs',
                rightText: 'click',
                onPress: () => {
                    if (this.state.homeDetail && this.state.homeDetail.deviceList.length > 0) {
                        const devIdList = []
                        this.state.homeDetail.deviceList.forEach(e => devIdList.push(e.devId))
                        TuyaHomeApi.bindNewConfigDevs({
                            homeId,
                            devIdList
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        }).catch((error) => {
                            this.showToast(error.toString())
                        })
                    }
                }
            },
            {
                key: 'registerProductWarnListener',
                leftText: 'registerProductWarnListener',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeApi.registerProductWarnListener({
                        homeId,
                    },()=>{})
                }
            },
            {
                key: 'unRegisterProductWarnListener',
                leftText: 'unRegisterProductWarnListener',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeApi.unRegisterProductWarnListener({
                        homeId,
                    })
                }
            },
            {
                key: 'bindNewConfigDevs',
                leftText: 'bindNewConfigDevs',
                rightText: 'click',
                onPress: () => {
                    if (this.state.homeDetail && this.state.homeDetail.deviceList.length > 0) {
                        const devIdList = []
                        this.state.homeDetail.deviceList.forEach(e => devIdList.push(e.devId))
                        TuyaHomeApi.bindNewConfigDevs({
                            homeId,
                            devIdList
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        }).catch((error) => {
                            this.showToast(error.toString())
                        })
                    }
                }
            },
            {
                key: 'sortDevInHome',
                leftText: 'sortDevInHome',
                rightText: 'click',
                onPress: () => {
                    if (this.state.homeDetail && this.state.homeDetail.deviceList.length > 0) {
                        TuyaHomeApi.sortDevInHome({
                            homeId,
                            list: this.state.homeDetail.deviceList
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        }).catch((error) => {
                            this.showToast(error.toString())
                        })
                    }
                }
            },
            {
                key: 'sortDevInHome',
                leftText: 'sortDevInHome',
                rightText: 'click',
                onPress: () => {
                    if (this.state.homeDetail && this.state.homeDetail.deviceList.length > 0) {
                        TuyaHomeApi.sortDevInHome({
                            homeId,
                            list: this.state.homeDetail.deviceList
                        }).then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        }).catch((error) => {
                            this.showToast(error.toString())
                        })
                    }
                }
            },
            {
                key: 'registerHomeDeviceStatusListener',
                leftText: 'registerHomeDeviceStatusListener',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeApi.registerHomeDeviceStatusListener({
                        homeId,
                    })
                }
            },
            {
                key: 'unRegisterHomeDeviceStatusListener',
                leftText: 'unRegisterHomeDeviceStatusListener',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeApi.unRegisterHomeDeviceStatusListener({
                        homeId,
                    })
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
