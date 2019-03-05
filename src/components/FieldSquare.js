// @flow

import React, {Component} from 'react';
import {View, Image} from 'react-native';

import {colors} from "../constants/Colors";

export default class FieldSquare extends Component<any, void> {
    render() {
        if(this.props.type === "Empty"){
            return (
                <View style={{
                    width : this.props.size,
                    height : this.props.size,
                    backgroundColor : colors[this.props.type],
                }}/>
            );
        } else if(this.props.type === "Finish" ){
            return (
                <Image
                    source={require('../../assets/images/parking.jpg')}
                    style={{
                        width : this.props.size,
                        height : this.props.size,
                    }}
                />
            );
        } else {
            return (
                <Image
                    source={require('../../assets/images/brick-wall.jpg')}
                    style={{
                        width : this.props.size,
                        height : this.props.size,
                    }}
                />
            );
        }
    }
}
