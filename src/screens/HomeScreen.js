// @flow

import React, {Component} from 'react';
import {View, Button, StatusBar, ImageBackground, TouchableOpacity, StyleSheet , Image, Text} from 'react-native';

import {styles} from "../styling/Style";
import {cycleSetting, setSetting, settings} from "../utilities/Settings";
import {getThemeAsset} from "../styling/Assets";
import SettingsScreen from "./SettingsScreen";

export default class HomeScreen extends Component<any, void> {
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

                    <StatusBar hidden/>

                    <TouchableOpacity style={styles.touchable}   onPress={() => this.props.navigation.navigate('Game')}>

                        <Image
                            source={getThemeAsset('redbutton')}
                            style={styles.image} />
                        <View style={styles.view}>
                            <Text style={styles.text}>play game</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchable}   onPress={() => this.props.navigation.navigate('Accelerometer')}>

                        <Image
                            source={getThemeAsset('redbutton')}
                            style={styles.image} />
                        <View style={styles.view}>
                            <Text style={styles.text}>Play with Accelerometer</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchable}   onPress={() => this.props.navigation.navigate('settings')}>

                        <Image
                            source={getThemeAsset('redbutton')}
                            style={styles.image} />
                        <View style={styles.view}>
                            <Text style={styles.text}>settings</Text>
                        </View>
                    </TouchableOpacity>





                </View>
            </ImageBackground>
        );
    }
}
