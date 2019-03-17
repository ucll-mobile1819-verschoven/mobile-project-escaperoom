// @flow

import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import {Provider} from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';
import store from "./src/redux/store";
import {setSetting} from "./src/redux/settingsRedux";

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
                <Provider store={store}>
                    <AppLoading
                        startAsync={this._loadResourcesAsync}
                        onError={this._handleLoadingError}
                        onFinish={this._handleFinishLoading}
                    />
                </Provider>
            );
        } else {
            return (
                <Provider store={store}>
                    <AppNavigator/>
                </Provider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
            this._loadSettings(),
        ]);
    };

    _handleLoadingError = (error: any) => {
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };

    _loadSettings() {
        return Promise.all([
            AsyncStorage.getItem('theme', (error, result) => store.dispatch(setSetting('theme', result))),
            AsyncStorage.getItem('highlight', (error, result) => store.dispatch(setSetting('highlight', result))),
        ]);
    }
}
