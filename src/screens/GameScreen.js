// @flow

import React, {Component} from 'react';
import {View, ImageBackground, Text, Modal , Image} from 'react-native';
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
                    <Text style={styles.title}>moves : {this.props.moveCounter}</Text>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.props.gameFinished}
                        onRequestClose={this.props.nextGame}>

                            <ImageBackground source={this.props.winbackground} style={styles.winScreen}>

                            <Image
                                style={{flex: 1}}
                                source={this.props.win}/>

                            <Text  style={styles.title}>moves : {this.props.moveCounter}</Text>

                                <ImageButton
                                    style={styles.smallButton}
                                    textStyle={styles.buttonText}
                                    title={"next level"}
                                    source={this.props.button}
                                    onPress={this.props.nextGame}/>
                            </ImageBackground>
                    </Modal>
                </View>
            </ImageBackground>

        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('Background', state.settings.theme),
    button: getThemeAsset('Button', state.settings.theme),
    winbackground : getThemeAsset('winbackground', state.settings.theme),
    win: getThemeAsset('win' , state.settings.theme),
    gameFinished : state.game.isGameFinished,
    moveCounter : state.game.moveCounter,
});

const mapDispatchToProps = dispatch => ({
    nextGame: () => dispatch(nextGame()),
    resetGame: () => dispatch(gameReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
