import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaSceneApi, TuyaHomeManagerApi, TuyaHomeDataManagerApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';
import { lon, lat } from '../../constant'


import Item from '../../common/Item'

export default class TestSceneApiPage extends BaseComponent {
    constructor(props) {
        super(props);
        TuyaHomeManagerApi.queryHomeList()
            .then((data) => {
                if (data.length !== 0) {
                    TuyaHomeDataManagerApi.getHomeDeviceList({ homeId: data[0].homeId }).then(devList => this.setState({ devList }))
                    TuyaHomeDataManagerApi.getHomeGroupList({ homeId: data[0].homeId }).then(groupList => this.setState({ groupList }))
                    TuyaSceneApi.getSceneList({ homeId: data[0].homeId }).then((sceneList) => this.setState({ sceneList }))
                    this.setState({
                        homeId: data[0].homeId
                    })
                }
            })
        this.state = {
            devList: [],
            groupList: [],
            sceneList: [],
            homeId: ''
        }
    }
    getList() {
        return [
            {
                key: 'getCityByLatLng',
                leftText: 'getCityByLatLng',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getCityByLatLng({
                        lon: lon + '',
                        lat: lat + ''
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getCityByCityIndex',
                leftText: 'getCityByCityIndex',
                rightText: 'click',
                onPress: () => {
                    let cityId
                    TuyaSceneApi.getCityByCityIndex({
                        cityId
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getDeviceTaskOperationList',
                leftText: 'getDeviceTaskOperationList',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getDeviceTaskOperationList({
                        devId: this.state.devList[0].devId
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getDeviceTaskOperationListByGroup',
                leftText: 'getDeviceTaskOperationListByGroup',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getDeviceTaskOperationListByGroup({
                        groupId: this.state.groupList[0].id + ''
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getDeviceTaskFunctionList',
                leftText: 'getDeviceTaskFunctionList',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getDeviceTaskFunctionList({
                        devId: this.state.devList[0].devId
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getDeviceTaskFunctionListByGoup',
                leftText: 'getDeviceTaskFunctionListByGoup',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getDeviceTaskFunctionListByGoup({
                        groupId: this.state.groupList[0].id + ''
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getSceneDetail',
                leftText: 'getSceneDetail',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getSceneDetail({
                        sceneId: this.state.sceneList[0].id
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getTaskDevList',
                leftText: 'getTaskDevList',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getTaskDevList({
                        homeId: this.state.homeId
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getTaskDevAndGoupList',
                leftText: 'getTaskDevAndGoupList',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getTaskDevAndGoupList({
                        homeId: this.state.homeId
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getSceneConditionDevList',
                leftText: 'getSceneConditionDevList',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getSceneConditionDevList({
                        homeId: this.state.homeId,
                        type: 1
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getDeviceConditionOperationList',
                leftText: 'getDeviceConditionOperationList',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getDeviceConditionOperationList({
                        devId: this.state.devList[0].devId
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getConditionList',
                leftText: 'getConditionList',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getConditionList({
                        showFahrenheit: false
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getConditionListAll',
                leftText: 'getConditionListAll',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getConditionListAll({
                        homeId: this.state.homeId,
                        showFahrenheit: false
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'sortSceneList',
                leftText: 'sortSceneList',
                rightText: 'click',
                onPress: () => {
                    const sceneIds = []
                    this.state.sceneList.forEach(d => {
                        sceneIds.push(d.id)
                    })
                    TuyaSceneApi.sortSceneList({
                        homeId: this.state.homeId,
                        sceneIds
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getScenePanelBoundList',
                leftText: 'getScenePanelBoundList',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getScenePanelBoundList({
                        devId: this.state.devList[0].devId
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getAvailableBindSceneList',
                leftText: 'getScenePanelBoundList',
                rightText: 'click',
                onPress: () => {
                    let gwId
                    TuyaSceneApi.getAvailableBindSceneList({
                        gwId,

                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'bindLocalScene',
                leftText: 'bindLocalScene',
                rightText: 'click',
                onPress: () => {
                    let gwId
                    let localSid
                    let dpId
                    TuyaSceneApi.bindLocalScene({
                        gwId,
                        devId: this.state.devList[0].devId,
                        dpId,
                        localSid,
                        sceneId: this.state.sceneList[0].id
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'unbindLocalScene',
                leftText: 'unbindLocalScene',
                rightText: 'click',
                onPress: () => {
                    let dpId
                    TuyaSceneApi.unbindLocalScene({
                        devId: this.state.devList[0].devId,
                        dpId,
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getSceneBgs',
                leftText: 'getSceneBgs',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.getSceneBgs()
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'registerSmartUpdateListener',
                leftText: 'registerSmartUpdateListener',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.registerSmartUpdateListener(() => { })
                }
            },
            {
                key: 'unRegisterSmartUpdateListener',
                leftText: 'unRegisterSmartUpdateListener',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.unRegisterSmartUpdateListener()
                }
            },
            {
                key: 'onDestroy',
                leftText: 'onDestroy',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.onDestroy()
                }
            },
            {
                key: 'enableScene',
                leftText: 'enableScene',
                rightText: 'click',
                onPress: () => {
                    if(this.state.sceneList.length==0)return
                    TuyaSceneApi.enableScene({
                        sceneId: this.state.sceneList[0].id
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'disableScene',
                leftText: 'disableScene',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.disableScene({
                        sceneId: this.state.sceneList[0].id
                    })
                        .then(data => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'onDestroyScene',
                leftText: 'onDestroyScene',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.onDestroyScene({
                        sceneId: this.state.sceneList[0].id
                    }) .then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                    .catch((error) => {
                        this.showToast(error.toString())
                    });
                }
            },
            {
                key: 'createSceneWithStickyOnTopAndPreCondition',
                leftText: 'createSceneWithStickyOnTopAndPreCondition',
                rightText: 'click',
                onPress: () => {
                    let homeId
                    let name
                    let stickyOnTop
                    let background
                    let matchType
                    let tasks
                    let PreCondition
                    TuyaSceneApi.createSceneWithStickyOnTopAndPreCondition({
                        homeId,
                        name,
                        stickyOnTop,
                        background,
                        matchType,
                        tasks,
                        PreCondition,
                    })
                }
            },
            {
                key: 'modifyScene',
                leftText: 'modifyScene',
                rightText: 'click',
                onPress: () => {
                    const sceneBean=this.state.sceneList[0]
                    // sceneBean.name='xxx'
                    TuyaSceneApi.modifyScene({
                        sceneBean,
                        sceneId:sceneBean.id
                    }) .then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                    .catch((error) => {
                        this.showToast(error.toString())
                    });
                }
            },
            {
                key: 'createSceneTask',
                leftText: 'createSceneTask',
                rightText: 'click',
                onPress: () => {
                    const sceneBean=this.state.sceneList[0]
                    TuyaSceneApi.createSceneTask({
                        sceneBean,
                    }) .then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                    .catch((error) => {
                        this.showToast(error.toString())
                    });
                }
            },
            {
                key: 'createDevCondition',
                leftText: 'createDevCondition',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.createDevCondition({
                        deviceBean:this.state.devList[0],
                        dpId:"1",
                        ruleType:'value',
                        type:'temp',
                        range:'==',
                        value:'20'
                    }) .then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                    .catch((error) => {
                        this.showToast(error.toString())
                    });
                }
            },
            {
                key: 'createTimerCondition',
                leftText: 'createTimerCondition',
                rightText: 'click',
                onPress: () => {
                    TuyaSceneApi.createTimerCondition({
                        display:'周一周二周三周四周五',
                        name:'工作日定时',
                        ruleType:'timer',
                        type:'timer',
                        timezoneId:"Asia/Shanghai",
                        loops:'0111110',
                        time:'16:00',
                        data:'20180310',
                    }) .then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                    .catch((error) => {
                        this.showToast(error.toString())
                    });
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
