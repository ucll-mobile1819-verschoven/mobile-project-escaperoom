// @flow

import React, {Component} from 'react';
import {getAsset, getThemeAsset} from "../styling/Assets";
import ImageButton from "../components/ImageButton";
import {connect} from "react-redux";

type BackButtonProps = {
    onPress: any;
    forceColor?: string;
}

class BackButton extends Component<BackButtonProps, void> {
    render() {
        return (
            <ImageButton
                title={''}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                style={{width: 50, height: 37, position: 'absolute', top: 0, left: 0, margin: 2, zIndex: 1}}
                imageStyle={{tintColor: this.props.forceColor ? this.props.forceColor : this.props.color}}
                source={getAsset('Back')}
                onPress={this.props.onPress}/>
        )
    }
}

const mapStateToProps = state => ({
    color: getThemeAsset('ContrastColor', state.settings.theme),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);
