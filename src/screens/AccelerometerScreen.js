// @flow

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Accelerometer} from 'expo';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {round} from "../utilities/Mathematics";
import {getThemeAsset} from "../styling/Assets";

type AccelerometerState = {
    x: number;
    y: number;
    z: number;
}

class AccelerometerScreen extends Component<any, AccelerometerState> {
    _subscription: any;

    constructor() {
        super();

        this.state = {
            x: 0,
            y: 0,
            z: 0,
        };
    }

    componentDidMount() {
        this._slow();
        this._toggle();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    };

    _slow = () => {
        Accelerometer.setUpdateInterval(1000);
    };

    _fast = () => {
        Accelerometer.setUpdateInterval(16);
    };

    _subscribe = () => {
        this._subscription = Accelerometer.addListener((result) => {
            this.setState(result);
        });
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        let {x, y, z} = this.state;

        return (
            <ImageBackground source={this.props.background} style={styles.container}>
                <View style={[styles.centered, styles.container]}>

                    <View style={styles.m10}>
                        <Text>Accelerometer:</Text>
                        <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
                        <Text>rotation x-axis: {round(Math.atan(y / z) * 180 / Math.PI)}°</Text>
                        <Text>rotation y-axis: {round(Math.atan(x / z) * 180 / Math.PI)}°</Text>
                        <Text>rotation z-axis: {round(Math.atan(x / y) * 180 / Math.PI)}°</Text>
                        <Text>You are holding me:
                            {Math.abs(x) < 0.5 && Math.abs(y) < 0.5 && "Horizontal"}
                            {Math.abs(x) < 0.5 && Math.abs(z) < 0.5 && "Vertical"}
                            {Math.abs(y) < 0.5 && Math.abs(z) < 0.5 && "Sideways"}
                        </Text>
                        <Text>You are turning me:
                            {round(Math.atan(x / Math.abs(z))) > 0.3 && "Left"}
                            {round(Math.atan(x / Math.abs(z))) < -0.3 && "Right"}
                        </Text>
                    </View>

                    <View style={styles.m10}>
                        <Text>Accelerometer: Controls</Text>
                        <TouchableOpacity onPress={this._toggle}>
                            <Text>Toggle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._slow}>
                            <Text>Slow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._fast}>
                            <Text>Fast</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('Background', state.settings.theme),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AccelerometerScreen);
