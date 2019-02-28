// @flow

import React, {Component} from 'react';
import {View, Button} from 'react-native';

import {styles} from "../stylesheets/style";

export default class HomeScreen extends Component<any, void> {
    render() {
        return (
            <View style={styles.menu}>
                <Button title="Play with Accelerometer"
                        onPress={() => this.props.navigation.navigate('Accelerometer')}/>

                <Button title="Play game"
                        onPress={() => this.props.navigation.navigate('Game')}/>
            </View>
        );
    }
}
