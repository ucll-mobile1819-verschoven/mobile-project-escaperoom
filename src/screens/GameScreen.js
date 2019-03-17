// @flow

import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getThemeAsset} from "../styling/Assets";
import GameField from "../components/GameField";
import ImageButton from "../components/ImageButton";
import {nextGame, gameReset} from "../redux/gameRedux";

class GameScreen extends Component<any, void> {
    render() {
        return (
            <ImageBackground source={this.props.background} style={styles.container}>
                <View style={styles.container}>

                    <View style={{flexDirection: 'row', width: '100%', height: 50}}>
                        <ImageButton
                            style={styles.smallButton}
                            textStyle={styles.buttonText}
                            title={"back"}
                            source={this.props.button}
                            onPress={() => this.props.navigation.navigate('Home')}/>

                        <ImageButton
                            style={styles.smallButton}
                            textStyle={styles.buttonText}
                            title={"next level"}
                            source={this.props.button}
                            onPress={this.props.nextGame}/>

                        <ImageButton
                            style={styles.smallButton}
                            textStyle={styles.buttonText}
                            title={"restart"}
                            source={this.props.button}
                            onPress={this.props.resetGame}/>
                    </View>

                    <GameField />

                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('Background', state.settings.theme),
    button: getThemeAsset('Button', state.settings.theme),
});

const mapDispatchToProps = dispatch => ({
    nextGame: () => dispatch(nextGame()),
    resetGame: () => dispatch(gameReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
