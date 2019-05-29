// @flow

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {AppLoading, Font, Icon} from 'expo';
import {Provider} from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';
import store from "./src/redux/store";
import {initialState as settingKeys, setSetting} from "./src/redux/settingsRedux";
import {initialState as playerDataKeys, setPlayerData} from "./src/redux/playerDataRedux";

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
            this._loadPlayerData(),
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
            Object.keys(settingKeys).map(key => AsyncStorage.getItem(key, (error, result) => store.dispatch(setSetting(key, result))))
         );
    }

    _loadPlayerData() {
        return Promise.all(
            Object.keys(playerDataKeys).map(key => AsyncStorage.getItem(key, (error, result) => store.dispatch(setPlayerData(key, result))))
        );
    }
}
