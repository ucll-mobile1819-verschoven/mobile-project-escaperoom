// @flow

import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import LoadingScreen from "../screens/LoadingScreen"
import HomeScreen from "../screens/HomeScreen";
import TutorialScreen from "../screens/TutorialScreen";
import LevelScreen from "../screens/LevelScreen";
import GameScreen from "../screens/GameScreen";
import SettingsScreen from "../screens/SettingsScreen";

export default createAppContainer(createStackNavigator({
    Loading: LoadingScreen,
    Home: HomeScreen,
    Tutorial: TutorialScreen,
    Level: LevelScreen,
    // Speedrun: SpeedrunScreen,
    Game: GameScreen,
    Settings: SettingsScreen
}, {
    initialRouteName: 'Loading',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}));