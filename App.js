// @flow

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {AppLoading, Font, Icon} from 'expo';
import {Provider} from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';
import store from "./src/redux/store";
import {initialState, setSetting} from "./src/redux/settingsRedux";

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
        if (!this.state.isLoadingComplete) {
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
        return Promise.all(
            Object.keys(initialState).map(key => AsyncStorage.getItem(key, (error, result) => store.dispatch(setSetting(key, result))))
         );
    }
}
