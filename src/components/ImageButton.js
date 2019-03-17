// @flow

import React, {Component} from 'react'
import {TouchableOpacity, View, Image, Text} from 'react-native'

import {styles} from "../styling/Style";

type ImageButtonProps = {
    style?: any;
    textStyle?: any;
    source: any;
    title: string;
    onPress: any;
}

export default class ImageButton extends Component<ImageButtonProps, void> {
    render() {
        return (
            <TouchableOpacity
                style={[styles.centered, this.props.style]}
                onPress={this.props.onPress}>

                <Image
                    style={{resizeMode: 'contain', flex: 1}}
                    source={this.props.source}/>

                <View style={{position: 'absolute', backgroundColor: 'transparent'}}>
                    <Text style={this.props.textStyle}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
