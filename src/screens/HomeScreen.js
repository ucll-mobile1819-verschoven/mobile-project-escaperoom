// @flow

import React, {Component} from 'react';
import {View, StatusBar, ImageBackground, Text, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {styles} from "../styling/Style";
import {getAsset, getThemeAsset} from "../styling/Assets";
import ImageButton from "../components/ImageButton";

class HomeScreen extends Component<any, void> {
    createMenuButton(title : string, screen : string) {
        return (
            <ImageButton
                style={[styles.m10, styles.menuButton]}
                textStyle={styles.buttonText}
                source={this.props.button}
                title={title}
                onPress={() => this.props.navigation.navigate(screen)}/>
        );
    }


    render() {
        return (
            <ImageBackground source={this.props.background} style={styles.container}>
                <ImageButton
                    title={''}
                    hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                    style={{width: 50, height: 50, position: 'absolute', top: 0, left: 0, margin: 2, zIndex: 1}}
                    imageStyle={{tintColor: this.props.color}}
                    source={getAsset('Exit')}
                    onPress={() => BackHandler.exitApp()}/>

                <Text style={[{textAlign: 'center', fontSize: 50, color: this.props.color, marginTop: 50}]}>park your car</Text>

                <View style={[styles.container, styles.centered, {marginTop: -100}]}>
                    <StatusBar hidden/>

                    {this.createMenuButton("Select Level", "Level")}
                    {/*this.createMenuButton("Speedrun", "Speedrun")*/}
                    {this.createMenuButton("Settings", "Settings")}
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('Background', state.settings.theme),
    color : getThemeAsset('ContrastColor', state.settings.theme),
    button: getThemeAsset('Button', state.settings.theme),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
