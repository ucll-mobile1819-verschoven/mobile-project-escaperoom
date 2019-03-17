// @flow

import React, {Component} from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';

import {getThemeAsset} from "../styling/Assets";

class FieldSquare extends Component<any, void> {
    render() {
        return (
            <Image
                source={getThemeAsset(this.props.type, this.props.theme)}
                fadeDuration={0}
                style={{
                    width : this.props.size,
                    height : this.props.size,
                }}
            />
        );
    }
}

const mapStateToProps = state => ({
    theme: state.settings.theme
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FieldSquare);

