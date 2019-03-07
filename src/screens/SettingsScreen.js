// @flow

import React, {Component} from 'react';
import {View, Button, StatusBar, ImageBackground, TouchableOpacity, StyleSheet , Image, Text} from 'react-native';

import {styles} from "../styling/Style";
import {cycleSetting, setSetting, settings} from "../utilities/Settings";
import {getThemeAsset} from "../styling/Assets";

export default class SettingsScreen extends Component<any, void> {
    _changeTheme() {
        cycleSetting('theme')
            .then(() => this.setState({}));
    }

    _changeHighlight() {
        cycleSetting('highlight')
            .then(() => this.setState({}));
    }

    render() {
        return (
            <ImageBackground  source={getThemeAsset('StartScreenBackground')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>



                    <Button title={"Change theme: " + settings.theme}
                            onPress={() => this._changeTheme()}/>

                    <Button title={"Change highlight: " + settings.highlight}
                            onPress={() => this._changeHighlight()}/>


                </View>
            </ImageBackground>
        );
    }
}
