// @flow

import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import FlingScreen from "../screens/FlingScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={'md-information-circle'}
      />
    ),
};

const GameStack = createStackNavigator({
    Game: GameScreen,
});

GameStack.navigationOptions = {
    tabBarLabel: 'Game',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={'md-link'}
      />
    ),
};

const FlingStack = createStackNavigator({
   Fling: FlingScreen,
});

FlingStack.navigationOptions = {
    tabBarLabel: 'Fling',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={'md-link'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    GameStack,
    FlingStack,
});
