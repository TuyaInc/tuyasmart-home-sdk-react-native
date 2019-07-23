import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ViewPropTypes
} from 'react-native'
import PropTypes from 'prop-types'

const { width } = Dimensions.get('window')
export default class CenterItem extends Component {
    static propTypes = {
        onPress: PropTypes.func,
        text: PropTypes.string,
        style:ViewPropTypes.style
    }
    static defaultProps = {
        onPress: () => { },
        text: '',
        style:{}
    }


    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    this.props.onPress()
                }}
            >
                <View
                    style={[{
                        width,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:'white'
                    },this.props.style]}
                >
                    <Text style={{ fontSize: 16, color: 'black' }}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
