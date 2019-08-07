import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaHomeMemberApi, TuyaHomeManagerApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';
import EmptyView from '../../common/EmptyView';
import { countryCode, userName,  } from '../../constant'

import Item from '../../common/Item'

export default class TestTuyaHomeMemberApi extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
        this.state = {
            home: null,
            memberList: []
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
                key: 'queryMemberList',
                leftText: 'queryMemberList',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeMemberApi.queryMemberList({ homeId }).then(data => {
                        this.setState({ content: JSON.stringify(data), memberList: data })
                    })
                }
            },
            {
                key: 'updateMember',
                leftText: 'updateMember',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeMemberApi.updateMember({ memberId: this.state.memberList[0].memberId, name: '', admin: true }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                }
            },
            {
                key: 'updateMemberWithBean',
                leftText: 'updateMemberWithBean',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeMemberApi.updateMemberWithBean({ memberWrapperBean: this.state.memberList[0] }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                }
            },
            {
                key: 'updateMemberRole',
                leftText: 'updateMemberRole',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeMemberApi.updateMemberRole({ memberId: this.state.memberList[0].memberId, admin: true }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                }
            },
            {
                key: 'addMember',
                leftText: 'addMember',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeMemberApi.addMember({
                        homeId,
                        countryCode,
                        userAccount: userName,
                        name: 'xx',
                        admin: true
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'addMemberWithBean',
                leftText: 'addMemberWithBean',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeMemberApi.addMemberWithBean({ memberWrapperBean: this.state.memberList[0] }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'removeMember',
                leftText: 'removeMember',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeMemberApi.removeMember({ memberId: this.state.memberList[0].memberId, }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'getMemberDeviceList',
                leftText: 'getMemberDeviceList',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeMemberApi.getMemberDeviceList({ relationId: ''}).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'addMemberAccount',
                leftText: 'addMemberAccount',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeMemberApi.addMemberAccount({ id: this.state.memberList[0].memberId, countryCode, userAccount: userName, admin: false }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            }, {
                key: 'uploadMemberAvatar',
                leftText: 'uploadMemberAvatar',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeMemberApi.uploadMemberAvatar({ fileName: '', filePath: '' }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'processInvitation',
                leftText: 'processInvitation',
                rightText: 'click',
                onPress: () => {
                    TuyaHomeMemberApi.processInvitation({ homeId, action: false }).then(data => {
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
