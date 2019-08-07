import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaActivatorApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';
import { wifiTimeOut } from '../../constant'


import Item from '../../common/Item'

export default class TestTuyaActivatorApiPage extends BaseComponent {
    constructor(props) {
        super(props);
    }
    getList() {
        return [
            {
                key: 'newGwSubDevActivator',
                leftText: 'newGwSubDevActivator',
                rightText: 'click',
                onPress: () => {
                    let devId=''
                    if(!devId)return
                    this.showToast('start wifi network configuration')
                    this.startLoading()
                    TuyaActivatorApi.newGwSubDevActivator({
                        time:wifiTimeOut,
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
