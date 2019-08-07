import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaOTAApi, TuyaHomeManagerApi, TuyaHomeApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';
import EmptyView from '../../common/EmptyView';


import Item from '../../common/Item'

export default class TestOTAApiPage extends BaseComponent {
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
        return [
            {
                key: 'startOta',
                leftText: 'startOta',
                rightText: 'click',
                onPress: () => {
                    TuyaOTAApi.startOta({
                        devId: this.state.dev.devId
                    })
                }
            },
            {
                key: 'getOtaInfo',
                leftText: 'getOtaInfo',
                rightText: 'click',
                onPress: () => {
                    TuyaOTAApi.getOtaInfo({
                        devId:  this.state.dev.devId
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'setOtaListener',
                leftText: 'setOtaListener',
                rightText: 'click',
                onPress: () => {
                    TuyaOTAApi.getOtaInfo({
                        devId:  this.state.dev.devId
                    },()=>{},()=>{},()=>{})
                }
            },
            {
                key: 'onDestroy',
                leftText: 'onDestroy',
                rightText: 'click',
                onPress: () => {
                    TuyaOTAApi.onDestroy({
                        devId:  this.state.dev.devId
                    })
                }
            },
        ]
    }
    renderHeaderView() {
        return <HeadView leftOnPress={() => this.props.navigation.pop()} centerText={'TestApi'} />
    }
    renderContent() {
        if (this.state.dev == null) {
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
