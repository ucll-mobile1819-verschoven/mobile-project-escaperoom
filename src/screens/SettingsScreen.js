// @flow

import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getThemeAsset} from "../styling/Assets";
import {setSetting, toggleSetting} from "../redux/settingsRedux";
import ImageButton from "../components/ImageButton";
import ImageSlider from "../components/ImageSlider";

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

                    <ImageSlider
                        style={[styles.m10, styles.menuButton]}
                        textStyle={styles.buttonText}
                        sliderStyle={{width: 180}}
                        title={"change car speed"}
                        source={this.props.button}
                        step={0.1}
                        minimumValue={5}
                        maximumValue={9.9}
                        onValueChange={this.props.changeCarSpeed}
                        value={this.props.carSpeed}/>

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
    carSpeed : 10 - parseFloat(state.settings.carSpeed),
});

const mapDispatchToProps = dispatch => ({
    changeTheme: () => dispatch(toggleSetting('theme')),
    changeHighlight: () => dispatch(toggleSetting('highlight')),
    changeCarSpeed : value => dispatch(setSetting('carSpeed', (10 - value).toString()))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
