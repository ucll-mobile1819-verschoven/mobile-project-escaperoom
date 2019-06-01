// @flow

import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import HomeScreen from "../screens/HomeScreen";
import LevelScreen from "../screens/LevelScreen";
import GameScreen from "../screens/GameScreen";
import SettingsScreen from "../screens/SettingsScreen";

export default createAppContainer(createStackNavigator({
    Home: HomeScreen,
    Level: LevelScreen,
    // Speedrun: SpeedrunScreen,
    Game: GameScreen,
    Settings: SettingsScreen
}, {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}));