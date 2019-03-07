// @flow

import React, {Component} from 'react';
import {View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';

import AppNavigator from './src/navigation/AppNavigator';
import {loadSettings} from "./src/utilities/Settings";

type AppState = {
    isLoadingComplete: boolean;
}

export default class App extends Component<any, AppState> {
    constructor() {
        super();

        this.state = {
            isLoadingComplete: false
        };
    }

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <AppNavigator/>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
            Asset.loadAsync([
                require('./assets/images/Car/parking.jpg'),
                require('./assets/images/Car/brick-wall.jpg'),
                require('./assets/images/Car/red-car.png'),
                require('./assets/images/Minimalistic/Minimalistic-player.jpg'),
            ]),
            loadSettings()
        ]);
    };

    _handleLoadingError = (error: any) => {
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}
