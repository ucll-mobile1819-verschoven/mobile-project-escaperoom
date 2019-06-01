// @flow

import React, {Component} from 'react';
import {getAsset} from "../styling/Assets";
import ImageButton from "../components/ImageButton";

type BackButtonProps = {
    onPress: any;
    color: string;
}

export default class BackButton extends Component<BackButtonProps, void> {
    render() {
        return (
            <ImageButton
                title={''}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                style={{width: 50, height: 50, position: 'absolute', top: 0, left: 0, margin: 2, zIndex: 1}}
                imageStyle={{tintColor: this.props.color}}
                source={getAsset('Back')}
                onPress={this.props.onPress}/>
        )
    }
}
