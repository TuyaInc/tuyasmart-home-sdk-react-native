import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaShareApi, TuyaHomeDataManagerApi, TuyaHomeMemberApi, TuyaHomeManagerApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';

import { countryCode, userName, } from '../../constant'

import Item from '../../common/Item'

export default class TestTuyaShareApiPage extends BaseComponent {
    constructor(props) {
        super(props);
        TuyaHomeManagerApi.queryHomeList()
            .then((homeList) => {
                if (homeList.length !== 0) {
                    TuyaHomeMemberApi.queryMemberList({ homeId: homeList[0].homeId }).then(data => {
                        this.setState({ memberList: data })
                    })
                    TuyaHomeDataManagerApi.getHomeDeviceList({ homeId: homeList[0].homeId }).then(data => {
                        this.setState({ devList: data })
                    })
                    this.setState({ home: homeList[0] })
                }
            })
        this.state = {
            memberList: [],
            home: '',
            devList: []
        }
    }
    getList() {
        return [
            {
                key: 'enableDevShare',
                leftText: 'enableDevShare',
                rightText: 'click',
                onPress: () => {
                    let devId = this.state.devList[0].devId
                    let memberId = this.state.memberList[0].memberId
                    TuyaShareApi.enableDevShare({
                        devId,
                        memberId
                    })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'disableDevShare',
                leftText: 'disableDevShare',
                rightText: 'click',
                onPress: () => {
                    let devId = this.state.devList[0].devId
                    let memberId = this.state.memberList[0].memberId
                    TuyaShareApi.disableDevShare({
                        devId,
                        memberId
                    })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'removeReceivedDevShare',
                leftText: 'removeReceivedDevShare',
                rightText: 'click',
                onPress: () => {
                    let devId = this.state.devList[0].devId
                    TuyaShareApi.removeReceivedDevShare({
                        devId,
                    })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'queryDevShareUserList',
                leftText: 'queryDevShareUserList',
                rightText: 'click',
                onPress: () => {
                    let devId = this.state.devList[0].devId
                    TuyaShareApi.queryDevShareUserList({
                        devId,
                    })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getUserShareInfo',
                leftText: 'getUserShareInfo',
                rightText: 'click',
                onPress: () => {
                    let memberId = this.state.memberList[0].memberId
                    TuyaShareApi.getUserShareInfo({
                        memberId
                    })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'getReceivedShareInfo',
                leftText: 'getReceivedShareInfo',
                rightText: 'click',
                onPress: () => {
                    let memberId = this.state.memberList[0].memberId
                    TuyaShareApi.getReceivedShareInfo({
                        memberId
                    })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'queryUserShareList',
                leftText: 'queryUserShareList',
                rightText: 'click',
                onPress: () => {
                    TuyaShareApi.queryUserShareList({
                        homeId: this.state.home.homeId
                    })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'queryShareReceivedUserList',
                leftText: 'queryShareReceivedUserList',
                rightText: 'click',
                onPress: () => {
                    TuyaShareApi.queryShareReceivedUserList()
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'queryShareDevFromInfo',
                leftText: 'queryShareDevFromInfo',
                rightText: 'click',
                onPress: () => {
                    let devId = this.state.devList[0].devId
                    TuyaShareApi.queryShareDevFromInfo({ devId })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'renameShareNickname',
                leftText: 'renameShareNickname',
                rightText: 'click',
                onPress: () => {
                    let memberId = this.state.memberList[0].memberId
                    TuyaShareApi.renameShareNickname({ memberId, name: 'xxx' })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'renameReceivedShareNickname',
                leftText: 'renameReceivedShareNickname',
                rightText: 'click',
                onPress: () => {
                    let memberId = this.state.memberList[0].memberId
                    TuyaShareApi.renameReceivedShareNickname({ memberId, name: 'xxx' })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'removeUserShare',
                leftText: 'removeUserShare',
                rightText: 'click',
                onPress: () => {
                    let memberId = this.state.memberList[0].memberId
                    TuyaShareApi.removeUserShare({ memberId })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'removeReceivedUserShare',
                leftText: 'removeReceivedUserShare',
                rightText: 'click',
                onPress: () => {
                    let memberId = this.state.memberList[0].memberId
                    TuyaShareApi.removeReceivedUserShare({ memberId })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'onDestroy',
                leftText: 'onDestroy',
                rightText: 'click',
                onPress: () => {
                    TuyaShareApi.onDestroy()
                }
            },
            {
                key: 'inviteShare',
                leftText: 'inviteShare',
                rightText: 'click',
                onPress: () => {
                    let devId = this.state.devList[0].devId
                    TuyaShareApi.inviteShare({ devId, userAccount: userName, countryCode })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'confirmShareInviteShare',
                leftText: 'confirmShareInviteShare',
                rightText: 'click',
                onPress: () => {
                    let shareId
                    TuyaShareApi.confirmShareInviteShare({ shareId })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'addShareWithMemberId',
                leftText: 'addShareWithMemberId',
                rightText: 'click',
                onPress: () => {
                    let memberId = this.state.memberList[0].memberId
                    let devId = this.state.devList[0].devId
                    TuyaShareApi.addShareWithMemberId({ memberId, devIds: [devId] })
                        .then((data) => {
                            this.setState({ content: JSON.stringify(data) })
                        })
                        .catch((error) => {
                            this.showToast(error.toString())
                        });
                }
            },
            {
                key: 'addShare',
                leftText: 'addShare',
                rightText: 'click',
                onPress: () => {
                    let devId = this.state.devList[0].devId
                    TuyaShareApi.addShare({ homeId: this.state.home.homeId, countryCode, userAccount: userName, shareBean: {
                        devIds:[devId],
                        meshIds:[]
                    }, autoSharing: false })
                        .then((data) => {
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
