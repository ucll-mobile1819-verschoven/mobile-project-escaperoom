// @flow

import React, {Component} from 'react';
import {View, StatusBar, ImageBackground, Text} from 'react-native';
import {connect} from 'react-redux';
import {styles} from "../styling/Style";
import {getThemeAsset} from "../styling/Assets";
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
