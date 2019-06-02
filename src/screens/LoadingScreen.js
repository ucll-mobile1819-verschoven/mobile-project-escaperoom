// @flow

import React, {Component} from 'react';
import {View, StatusBar, ImageBackground} from 'react-native';
import {styles} from "../styling/Style";
import {getAsset} from "../styling/Assets";
import ImageButton from "../components/ImageButton";
import {window} from "../styling/Layout"

export default class LoadingScreen extends Component<any, void> {
    render() {
        return (
            <ImageBackground source={getAsset('Loading')} style={styles.container}>
                <StatusBar hidden/>

                <View style={{position: 'absolute', top: window.height * 0.74, height: '26%', width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                    <ImageButton
                        title={'Continue'}
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        style={{width: 200, height: 60}}
                        textStyle={{color: 'white', fontSize: 36}}
                        source={require('../../assets/images/Car/redbutton.png')}
                        onPress={() => this.props.navigation.replace('Home')}/>
                </View>
            </ImageBackground>
        );
    }
}
