import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaDeviceApi,TuyaHomeManagerApi,TuyaHomeApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';


import Item from '../../common/Item'

export default class TuyaDeviceApiPage extends BaseComponent {
    constructor(props) {
        super(props);
        TuyaHomeManagerApi.queryHomeList()
            .then((data) => {
                if (data.length !== 0) {
                    TuyaHomeApi.getHomeDetail({ homeId: data[0].homeId }).then(data => {
                        this.setState(
                            {
                                dev: data.deviceList[0]
                            }
                        )
                    })
                }
            })
        this.state = {
            dev: null
        }
    }
    getList() {
        const {dev}=this.state
      console.log(dev)
        return [
            {
                key: 'publishDpsWithEnum',
                leftText: 'publishDpsWithEnum',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    //TYDevicePublishModeLocal,TYDevicePublishModeInternet,TYDevicePublishModeAuto
                    let TYDevicePublishModeEnum = 'TYDevicePublishModeLocal'
                    let dps = dev.dps
                    TuyaDeviceApi.publishDpsWithEnum({
                        devId,
                        TYDevicePublishModeEnum,
                        dps: JSON.stringify(dps)
                    })
                        .then(() => {
                            this.showToast('success')
                            this.stopLoading();
                        })
                        .catch((error) => {
                            this.stopLoading();
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getDp',
                leftText: 'getDp',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    let dpId=''
                    TuyaDeviceApi.getDp({
                        devId,
                        dpId
                    })
                        .then((data) => {
                            this.setState({content:JSON.stringify(data)})
                            this.stopLoading();
                        })
                        .catch((error) => {
                            this.stopLoading();
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getDpList',
                leftText: 'getDpList',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    let list=[]
                    TuyaDeviceApi.getDpList({
                        devId,
                        list
                    })
                        .then((data) => {
                          this.setState({content:JSON.stringify(data)})
                            this.stopLoading();
                        })
                        .catch((error) => {
                            this.stopLoading();
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'resetFactory',
                leftText: 'resetFactory',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    TuyaDeviceApi.resetFactory({
                        devId,
                    })
                        .then(() => {
                            this.showToast('success')
                            this.stopLoading();
                        })
                        .catch((error) => {
                            this.stopLoading();
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getDeviceProperty',
                leftText: 'getDeviceProperty',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    TuyaDeviceApi.getDeviceProperty({
                        devId,
                    })
                    .then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                        .catch((error) => {
                            this.stopLoading();
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'saveDeviceProperty',
                leftText: 'saveDeviceProperty',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    let code=''
                    let value=''
                    TuyaDeviceApi.saveDeviceProperty({
                        devId,
                        code,
                        value
                    })
                        .then(() => {
                            this.showToast('success')
                            this.stopLoading();
                        })
                        .catch((error) => {
                            this.stopLoading();
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getDataPointStat',
                leftText: 'getDataPointStat',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    let number=10
                    let dpId='1'
                    //DAY,WEEK,MONTH
                    let DataPointTypeEnum='DAY'
                    const startTime=new Date().getTime()
                    TuyaDeviceApi.getDataPointStat({
                        devId,
                        startTime,
                        DataPointTypeEnum,
                        number,
                        dpId
                    })
                    .then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                        .catch((error) => {
                            this.stopLoading();
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'queryData',
                leftText: 'queryData',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    const data=''
                    TuyaDeviceApi.queryData({
                        devId,
                        data
                    })
                    .then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                        .catch((error) => {
                            this.stopLoading();
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'queryData',
                leftText: 'queryData',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    const data=''
                    TuyaDeviceApi.queryData({
                        devId,
                        data
                    })
                    .then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                        .catch((error) => {
                            this.stopLoading();
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'requestWifiSignal',
                leftText: 'requestWifiSignal',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    TuyaDeviceApi.requestWifiSignal({
                        devId,
                    })
                    .then(data => {
                        this.setState({ content: data })
                    })
                        .catch((error) => {
                            this.stopLoading();
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getInitiativeQueryDpsInfoWithDpsArray',
                leftText: 'getInitiativeQueryDpsInfoWithDpsArray',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    console.log(dev)
                    let list=[1,2]
                    TuyaDeviceApi.getInitiativeQueryDpsInfoWithDpsArray({
                        devId,
                        list
                    })
                    .then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                        .catch((error) => {
                            this.stopLoading();
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'registerWarnMessageListener',
                leftText: 'registerWarnMessageListener',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    TuyaDeviceApi.registerWarnMessageListener({
                        devId,
                    },()=>{
                        
                    })
                }
            },
        ]
    }
    renderHeaderView() {
        return <HeadView leftOnPress={() => this.props.navigation.pop()} centerText={'TestApi'} />
    }
    renderContent() {
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
