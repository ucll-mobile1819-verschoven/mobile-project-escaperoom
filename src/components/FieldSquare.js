// @flow

import React, {Component} from 'react';
import {Image} from 'react-native';

import {getThemeAsset} from "../styling/Assets";

export default class FieldSquare extends Component<any, void> {
    render() {
        return (
            <Image
                source={getThemeAsset(this.props.type)}
                fadeDuration={0}
                style={{
                    width : this.props.size,
                    height : this.props.size,
                }}
            />
        );
    }
}
