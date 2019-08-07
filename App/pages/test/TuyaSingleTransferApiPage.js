import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaSingleTransferApi,TuyaHomeManagerApi,TuyaHomeDataManagerApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';


import Item from '../../common/Item'

export default class TuyaSingleTransferApiPage extends BaseComponent {
    constructor(props) {
        super(props);
        TuyaHomeManagerApi.queryHomeList()
            .then((data) => {
                if (data.length !== 0) {
                    TuyaHomeDataManagerApi.getHomeDeviceList({ homeId: data[0].homeId }).then(devList => this.setState({ devList }))
                }
            })
        this.state = {
            devList: [],
        }
    }
    getList() {
        return [
            {
                key: 'startConnect',
                leftText: 'startConnect',
                rightText: 'click',
                onPress: () => {
                    TuyaSingleTransferApi.startConnect()
                }
            },
            {
                key: 'isOnline',
                leftText: 'isOnline',
                rightText: 'click',
                onPress: () => {
                    TuyaSingleTransferApi.isOnline().then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'subscribeDevice',
                leftText: 'subscribeDevice',
                rightText: 'click',
                onPress: () => {
                    TuyaSingleTransferApi.subscribeDevice({
                        devId:this.state.devList[0].devId
                    })
                }
            },
            {
                key: 'unSubscribeDevice',
                leftText: 'unSubscribeDevice',
                rightText: 'click',
                onPress: () => {
                    TuyaSingleTransferApi.unSubscribeDevice({
                        devId:this.state.devList[0].devId
                    })
                }
            },
            {
                key: 'registerTransferDataListener',
                leftText: 'registerTransferDataListener',
                rightText: 'click',
                onPress: () => {
                    TuyaSingleTransferApi.registerTransferDataListener(()=>{},()=>{})
                }
            },
            {
                key: 'unRegisterTransferDataListener',
                leftText: 'unRegisterTransferDataListener',
                rightText: 'click',
                onPress: () => {
                    TuyaSingleTransferApi.unRegisterTransferDataListener()
                }
            },
            {
                key: 'registerTransferCallback',
                leftText: 'registerTransferCallback',
                rightText: 'click',
                onPress: () => {
                    TuyaSingleTransferApi.registerTransferCallback(()=>{},()=>{})
                }
            },
            {
                key: 'unRegisterTransferCallback',
                leftText: 'unRegisterTransferCallback',
                rightText: 'click',
                onPress: () => {
                    TuyaSingleTransferApi.unRegisterTransferCallback()
                }
            },
            {
                key: 'stopConnect',
                leftText: 'stopConnect',
                rightText: 'click',
                onPress: () => {
                    TuyaSingleTransferApi.stopConnect()
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
