import React from 'react';
import {
    View, StyleSheet, ScrollView
} from 'react-native';
import HeadView from '../../common/HeadView'

import BaseComponent from '../../common/BaseComponent';

import Item from '../../common/Item'
import {LIST} from '../test/index'
export default class TestApiPage extends BaseComponent {
    constructor(props) {
        super(props);
    }


    getList() {
        const l=[]
        LIST.forEach(e=>{
            l.push({
                key: e.name,
                leftText:  e.name,
                rightText: 'click',
                onPress: () => {
                    this.props.navigation.navigate(e.name)
                }
            })
        })
        return l
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
