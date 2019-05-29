// @flow

import React, {Component} from 'react'
import {TouchableOpacity, View, Image, Text} from 'react-native'

import {styles} from "../styling/Style";

type ImageButtonProps = {
    style?: any;
    textStyle?: any;
    imageStyle?: any;
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
                    style={[{position: 'absolute', width: "100%", height: "100%", resizeMode: 'contain'}, this.props.imageStyle]}
                    source={this.props.source}/>

                <Text style={this.props.textStyle}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }
}
