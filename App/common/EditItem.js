import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TextInput,
} from 'react-native'
import PropTypes from 'prop-types'

const { width } = Dimensions.get('window')
export default class EditItem extends Component {
    static propTypes = {
        leftText: PropTypes.string,
        style: PropTypes.object,
        textStyle: PropTypes.object,
        value:PropTypes.string,
        onChangeText:PropTypes.func
    }

    static defaultProps = {
        leftText: '',
        style: {},
        textStyle: {},
        onChangeText:()=>{}
    }


    render() {
        return (
            <View style={[styles.item, this.props.style]}>
                <Text style={[styles.text, this.props.textStyle]}>{this.props.leftText}</Text>
                <TextInput
                    multiline={false}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#C3C3C9"
                    value={this.props.value}
                    onChangeText={(value) =>this.props.onChangeText(value)}
                    style={styles.inputStyle}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width,
        height: 50,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E4E4E4',
        paddingLeft: 15,

    },
    inputStyle:{
        flex:1,
        textAlign:'right',
        marginRight:15
    },
    text: {
        color: '#444444',
        fontSize: 14,
        textAlign: 'left',
        width: 100
    },
})
