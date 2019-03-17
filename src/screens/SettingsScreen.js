// @flow

import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getThemeAsset} from "../styling/Assets";
import ImageButton from "../components/ImageButton";
import {toggleSetting} from "../redux/settingsRedux";

class SettingsScreen extends Component<any, void> {
    render() {
        return (
            <ImageBackground  source={this.props.background} style={styles.container}>
                <View style={[styles.container, styles.centered]}>

                    <ImageButton
                        style={[styles.m10, styles.menuButton]}
                        textStyle={styles.buttonText}
                        title={"Change theme: " + this.props.theme}
                        source={this.props.button}
                        onPress={this.props.changeTheme}/>

                    <ImageButton
                        style={[styles.m10, styles.menuButton]}
                        textStyle={styles.buttonText}
                        title={"Change highlight: " + this.props.highlight}
                        source={this.props.button}
                        onPress={this.props.changeHighlight}/>

                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('Background', state.settings.theme),
    button: getThemeAsset('Button', state.settings.theme),

    theme: state.settings.theme,
    highlight: state.settings.highlight,
});

const mapDispatchToProps = dispatch => ({
    changeTheme: () => dispatch(toggleSetting('theme')),
    changeHighlight: () => dispatch(toggleSetting('highlight')),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
