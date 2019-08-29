import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaFeedBackApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';


import Item from '../../common/Item'

export default class TuyaDeviceApiPage extends BaseComponent {

    getList() {
        return [
            {
                key: 'getFeedbackList',
                leftText: 'getFeedbackList',
                rightText: 'click',
                onPress: () => {
                    TuyaFeedBackApi.getFeedbackList()
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
                key: 'getFeedbackType',
                leftText: 'getFeedbackType',
                rightText: 'click',
                onPress: () => {
                    TuyaFeedBackApi.getFeedbackType()
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
                key: 'addFeedback',
                leftText: 'addFeedback',
                rightText: 'click',
                onPress: () => {
                    TuyaFeedBackApi.addFeedback({
                        message: '哈哈', // 反馈内容
                        contact: '123123123', // 联系方式（电话或邮箱）
                        hdId: '6c03b81fade341ad12bezz', // 反馈类目id
                        hdType: 2, // 反馈类型
                    }).then(data => {
                        this.showToast('success')
                        this.setState({ content: JSON.stringify(data) })
                    })
                }
            },
            {
                key: 'getMsgList',
                leftText: 'getMsgList',
                rightText: 'click',
                onPress: () => {
                    TuyaFeedBackApi.getMsgList({
                        hdId: '6c03b81fade341ad12bezz', // 反馈类目id
                        hdType: 2, // 反馈类型
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'addMsg',
                leftText: 'addMsg',
                rightText: 'click',
                onPress: () => {
                    TuyaFeedBackApi.addMsg({
                        message: 'hahahaah', // 反馈内容
                        contact: '123123123', // 联系方式（电话或邮箱）
                        hdId: '6c03b81fade341ad12bezz', // 反馈类目id
                        hdType: 2, // 反馈类型
                    }).then(data => {
                        this.showToast('success')
                        this.setState({ content: JSON.stringify(data) })
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
