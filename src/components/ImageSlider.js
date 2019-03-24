// @flow

import React, {Component} from 'react'
import {View, Image, Text, Slider} from 'react-native'

import {styles} from "../styling/Style";

type ImageSliderProps = {
    style?: any;
    textStyle?: any;
    sliderStyle: any;
    source: any;
    title: string;
    step: number;
    minimumValue: number;
    maximumValue: number;
    onValueChange: any;
    value: number;
}

export default class ImageButton extends Component<ImageSliderProps, void> {
    render() {
        return (
            <View style={[styles.centered, this.props.style]}>
                <Image
                    style={{position: 'absolute', width: "100%", height: "100%", resizeMode: 'contain'}}
                    source={this.props.source}/>

                <Text style={this.props.textStyle}>
                    {this.props.title}
                </Text>

                <Slider
                    style={this.props.sliderStyle}
                    step={this.props.step}
                    minimumValue={this.props.minimumValue}
                    maximumValue={this.props.maximumValue}
                    onValueChange={this.props.onValueChange}
                    value={this.props.value}/>
            </View>
        )
    }
}
