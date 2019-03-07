// @flow

import React, {Component} from 'react';
import {View, Button, StatusBar} from 'react-native';

import {styles} from "../styling/Style";
import {cycleSetting, setSetting, settings} from "../utilities/Settings";

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
            <View style={styles.container}>
                <StatusBar hidden/>

                <Button title="Play with Accelerometer"
                        onPress={() => this.props.navigation.navigate('Accelerometer')}/>

                <Button title="Play game"
                        onPress={() => this.props.navigation.navigate('Game')}/>

                <Button title={"Change theme: " + settings.theme}
                        onPress={() => this._changeTheme()}/>

                <Button title={"Change highlight: " + settings.highlight}
                        onPress={() => this._changeHighlight()}/>
            </View>
        );
    }
}
