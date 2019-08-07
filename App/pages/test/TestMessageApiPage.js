import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaMessageApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';


import Item from '../../common/Item'

export default class TestMessageApiPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    getList() {
        return [
            {
                key: 'getMessageList',
                leftText: 'getMessageList',
                rightText: 'click',
                onPress: () => {
                    TuyaMessageApi.getMessageList()
                        .then(data => {
                            this.setState({ content: JSON.stringify(data), data })
                        })
                }
            },
            {
                key: 'getMessageListParams',
                leftText: 'getMessageListParams',
                rightText: 'click',
                onPress: () => {
                    TuyaMessageApi.getMessageListParams({
                        limit: 10,
                        offset: 0
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
                key: 'getMessageListParamsWithTime',
                leftText: 'getMessageListParamsWithTime',
                rightText: 'click',
                onPress: () => {
                    TuyaMessageApi.getMessageListParamsWithTime({
                        limit: 10,
                        offset: 0,
                        startTime: new Date('2019-07-27 10:31:54').getTime(),
                        endTime: new Date('2019-10-27 10:31:54').getTime()
                    }).then(data => {
                        this.showToast('success')
                        this.setState({ content: JSON.stringify(data) })
                    })
                }
            },
            {
                key: 'getMessageListByMsgType',
                leftText: 'getMessageListByMsgType',
                rightText: 'click',
                onPress: () => {
                    TuyaMessageApi.getMessageListByMsgType({
                        offset: 0,
                        limit: 10,
                        //MSG_REPORT,MSG_FAMILY,MSG_NOTIFY
                        msgType: 'MSG_REPORT'
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'getMessageListByMsgSrcId',
                leftText: 'getMessageListByMsgSrcId',
                rightText: 'click',
                onPress: () => {
                    TuyaMessageApi.getMessageListByMsgSrcId({
                        offset: 0,
                        limit: 10,
                        msgSrcId:this.state.data[0].msgSrcId,
                        //MSG_REPORT,MSG_FAMILY,MSG_NOTIFY
                        msgType: 'MSG_REPORT'
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'getMessageMaxTime',
                leftText: 'getMessageMaxTime',
                rightText: 'click',
                onPress: () => {
                    TuyaMessageApi.getMessageMaxTime().then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'deleteMessage',
                leftText: 'deleteMessage',
                rightText: 'click',
                onPress: () => {
                    TuyaMessageApi.deleteMessage({
                        ids:[this.state.data[0].id]
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
