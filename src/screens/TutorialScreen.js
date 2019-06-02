// @flow

import React, {Component} from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import {styles} from "../styling/Style";
import {getAsset, getThemeAsset} from "../styling/Assets";
import BackButton from "../components/BackButton";

class TutorialScreen extends Component<any, void> {
    render() {
        return (
            <ImageBackground source={this.props.background} style={styles.container}>
                <BackButton onPress={() => this.props.navigation.navigate('Home')} color={this.props.color}/>

                <Text style={{textAlign: 'center', fontSize: 40, color: this.props.color, padding: 10}}>How to play</Text>

                <View style={[styles.centered, styles.container]}>
                    <View style={{flexDirection: 'row', padding: 20, alignItems: 'flex-end', height: 112}}>
                        <Image style={{width: 64, height: 64}} source={this.props.player}/>
                        <View>
                            <Image style={{width: 64, height: 64, tintColor: this.props.color}} source={getAsset('Swipe')}/>
                            <Image style={{width: 64, height: 32}} source={this.props.RightArrow}/>
                            <View style={{width: 64, height: 16}}/>
                        </View>
                        <Image style={{width: 64, height: 64}} source={this.props.finish}/>
                        <Image style={{width: 64, height: 64}} source={this.props.wall}/>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('Background', state.settings.theme),
    color : getThemeAsset('ContrastColor', state.settings.theme),
    player: getThemeAsset('Player', state.settings.theme),
    RightArrow : getThemeAsset('RightArrow', state.settings.theme),
    finish : getThemeAsset('Finish', state.settings.theme),
    wall : getThemeAsset('Wall', state.settings.theme),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorialScreen);
