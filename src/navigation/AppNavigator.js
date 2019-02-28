// @flow

import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import HomeScreen from "../screens/HomeScreen";
import GameScreen from "../screens/GameScreen";
import AccelerometerScreen from "../screens/AccelerometerScreen";

export default createAppContainer(createStackNavigator({
    Home: HomeScreen,
    Game: GameScreen,
    Accelerometer: AccelerometerScreen
}, {
    initialRouteName: 'Home',
}));