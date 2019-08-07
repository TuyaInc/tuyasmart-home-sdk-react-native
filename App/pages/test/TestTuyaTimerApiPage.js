import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaTimerApi, TuyaHomeManagerApi, TuyaHomeApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';

import { taskName } from '../../constant'

import Item from '../../common/Item'

export default class TestTuyaTimerApiPage extends BaseComponent {
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
        const { dev } = this.state
        return [
            {
                key: 'getTimerTaskStatusWithDeviceId',
                leftText: 'getTimerTaskStatusWithDeviceId',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    TuyaTimerApi.getTimerTaskStatusWithDeviceId({
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
                key: 'getTimerWithTask',
                leftText: 'getTimerWithTask',
                rightText: 'click',
                onPress: () => {
                    let devId = dev.devId
                    TuyaTimerApi.getTimerWithTask({
                        devId,
                        taskName
                    })
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
