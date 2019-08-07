import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaGatewayApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';


import Item from '../../common/Item'

export default class TestTuyaGatewayApi extends BaseComponent {

    getList() {
        return [
            {
                key: 'publishDps',
                leftText: 'publishDps',
                rightText: 'click',
                onPress: () => {
                    let devId
                    let localId
                    let dps={}
                    TuyaGatewayApi.publishDps({
                        devId,
                        localId,
                        dps:JSON.stringify(dps)
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
                key: 'broadcastDps',
                leftText: 'broadcastDps',
                rightText: 'click',
                onPress: () => {
                    let devId
                    let dps={}
                    TuyaGatewayApi.broadcastDps({
                        devId,
                        dps:JSON.stringify(dps)
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
                key: 'multicastDps',
                leftText: 'multicastDps',
                rightText: 'click',
                onPress: () => {
                    let devId
                    let localId
                    let dps={}
                    TuyaGatewayApi.multicastDps({
                        devId,
                        localId,
                        dps:JSON.stringify(dps)
                    }).then(data => {
                        this.showToast('success')
                        this.setState({ content: JSON.stringify(data) })
                    })
                }
            },
            {
                key: 'registerSubDevListener',
                leftText: 'registerSubDevListener',
                rightText: 'click',
                onPress: () => {
                    let devId
                    TuyaGatewayApi.registerSubDevListener({
                        devId
                    },()=>{},()=>{},()=>{},()=>{},()=>{})
                }
            },
            {
                key: 'unRegisterSubDevListener',
                leftText: 'unRegisterSubDevListener',
                rightText: 'click',
                onPress: () => {
                    let devId='2'
                    TuyaGatewayApi.unRegisterSubDevListener({
                        devId
                    })
                }
            },
            {
                key: 'onDestroy',
                leftText: 'onDestroy',
                rightText: 'click',
                onPress: () => {
                    let devId
                    TuyaGatewayApi.onDestroy({
                        devId
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
