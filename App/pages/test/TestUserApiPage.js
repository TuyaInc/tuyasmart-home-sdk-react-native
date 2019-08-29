import React from 'react';
import {
    View, StyleSheet, ScrollView, Text
} from 'react-native';
import { TuyaUserApi } from '../../../sdk'
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';
import { countryCode, userName, password, uid,region } from '../../constant'

import Item from '../../common/Item'

export default class TestUserApiPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state={
            content:''
        }
    }


    getList() {
        return [
            {
                key: 'getRegionListWithCountryCode',
                leftText: 'getRegionListWithCountryCode',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.getRegionListWithCountryCode({ countryCode }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                }
            },
            {
                key: 'upgradeVersion',
                leftText: 'upgradeVersion',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.upgradeVersion().then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                }
            },
            {
                key: 'checkVersionUpgrade',
                leftText: 'checkVersionUpgrade',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.checkVersionUpgrade().then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    })
                }
            },
            {
                key: 'loginByTwitter',
                leftText: 'loginByTwitter',
                rightText: 'click',
                onPress: () => {
                    const key = ''
                    const secret = ''
                    if (!key || !secret) return
                    TuyaUserApi.loginByTwitter({
                        countryCode,
                        key,
                        secret
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'loginByQQ',
                leftText: 'loginByQQ',
                rightText: 'click',
                onPress: () => {
                    const userId = ''
                    const accessToken = ''
                    if (!userId || !accessToken) return
                    TuyaUserApi.loginByQQ({
                        countryCode,
                        userId,
                        accessToken
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'loginByWechat',
                leftText: 'loginByWechat',
                rightText: 'click',
                onPress: () => {
                    const code = ''
                    if (!code) return
                    TuyaUserApi.loginByWechat({
                        countryCode,
                        code
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'loginByFacebook',
                leftText: 'loginByFacebook',
                rightText: 'click',
                onPress: () => {
                    const token = ''
                    if (!token) return
                    TuyaUserApi.loginByFacebook({
                        countryCode,
                        token
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            // type
            // 1: mobile phone verification code register,
            // 2: mobile phone verification code login,
            // 3: mobile phone password reset.
            {
                key: 'checkPhoneCode',
                leftText: 'checkPhoneCode',
                rightText: 'click',
                onPress: () => {
                    let type=1;
                    TuyaUserApi.checkPhoneCode({
                        countryCode,
                        phoneNumber: userName,
                        code: '86',
                        type
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'checkEmailPassword',
                leftText: 'checkEmailPassword',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.checkEmailPassword({
                        password,
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'loginWithUid',
                leftText: 'loginWithUid',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.loginWithUid({
                        password,
                        countryCode,
                        uid
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'updateTimeZone',
                leftText: 'updateTimeZone',
                rightText: 'click',
                onPress:()=>{
                    TuyaUserApi.getUser()
                    .then((data) => {
                        if(data){
                            TuyaUserApi.updateTimeZone({timezoneId:data.timezoneId}).then(data => {
                                this.setState({ content: JSON.stringify(data) })
                            }).catch((error) => {
                                this.showToast(error.toString())
                            })
                        }
                       
                    })
                }
              },
            {
                key: 'loginOrRegisterWithUid',
                leftText: 'loginOrRegisterWithUid',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.loginOrRegisterWithUid({
                        password,
                        countryCode,
                        uid
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'loginOrRegisterWithUidAndCreateHome',
                leftText: 'loginOrRegisterWithUidAndCreateHome',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.loginOrRegisterWithUidAndCreateHome({
                        password,
                        countryCode,
                        uid,
                        isCreateHome: true
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'registerAccountWithUid',
                leftText: 'registerAccountWithUid',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.registerAccountWithUid({
                        password,
                        countryCode,
                        uid,
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'saveUser',
                leftText: 'saveUser',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.getUser()
                    .then((data) => {
                        if(data){
                            TuyaUserApi.saveUser({user:data}).then(data => {
                                this.setState({ content: JSON.stringify(data) })
                            }).catch((error) => {
                                this.showToast(error.toString())
                            })
                        }
                       
                    })
                }
            },
            {
                key: 'sendBindVerifyCode',
                leftText: 'sendBindVerifyCode',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.sendBindVerifyCode({countryCode,phoneNumber:userName}).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'bindMobile',
                leftText: 'bindMobile',
                rightText: 'click',
                onPress: () => {
                    let code=''
                    if(!code)return
                    TuyaUserApi.bindMobile({countryCode,phoneNumber:userName,code}).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'switchUserRegion',
                leftText: 'switchUserRegion',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.switchUserRegion({
                        region,
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'removeUser',
                leftText: 'removeUser',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.removeUser().then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'cancelAccount',
                leftText: 'cancelAccount',
                rightText: 'click',
                onPress: () => {
                    TuyaUserApi.cancelAccount().then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'sendVerifyCodeWithUserName',
                leftText: 'sendVerifyCodeWithUserName',
                rightText: 'click',
                onPress: () => {
                    const type=1
                    if(!region)return
                    TuyaUserApi.sendVerifyCodeWithUserName({
                        userName,
                        countryCode,
                        region,
                        type
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'checkCodeWithUserName',
                leftText: 'checkCodeWithUserName',
                rightText: 'click',
                onPress: () => {
                    const code=''
                    const type=1
                    if(!code||!region)return
                    TuyaUserApi.checkCodeWithUserName({
                        userName,
                        countryCode,
                        code,
                        region,
                        type
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'registerWithUserName',
                leftText: 'registerWithUserName',
                rightText: 'click',
                onPress: () => {
                    const code=''
                    if(!code||!region)return
                    TuyaUserApi.registerWithUserName({
                        password,
                        userName,
                        countryCode,
                        code,
                        region
                    }).then(data => {
                        this.setState({ content: JSON.stringify(data) })
                    }).catch((error) => {
                        this.showToast(error.toString())
                    })
                }
            },
            {
                key: 'uploadUserAvatar',
                leftText: 'uploadUserAvatar',
                rightText: 'click',
                onPress: () => {
                    const filePath=''
                    if(!filePath)return
                    TuyaUserApi.uploadUserAvatar({
                        filePath
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
