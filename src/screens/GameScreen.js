// @flow

import React, {Component} from 'react';
import {View, ImageBackground, Text, Modal , Image} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getThemeAsset} from "../styling/Assets";
import GameField from "../components/GameField";
import ImageButton from "../components/ImageButton";
import WinScreen from "../components/WinScreen";
import {nextGame, gameReset} from "../redux/gameRedux";
import {updateHighscore} from "../redux/playerDataRedux";
import {idToDifficulty} from "../game/GameLevel";

class GameScreen extends Component<any, void> {
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.gameFinished && this.props.gameFinished){
            this.props.updateHighscore(this.props.levelId, this.props.moveCounter);
        }
    }

    render() {
        let nextGame = () => {
            this.props.nextGame();
            this.props.navigation.replace('Game');
        };

        let resetGame = () => {
            this.props.resetGame();
            this.props.navigation.replace('Game');
        };

        let back = () => {
            this.props.resetGame();
            this.props.navigation.navigate('Level');
        };

        return (
            <ImageBackground source={this.props.background} style={styles.container}>
                <View style={styles.container}>
                    <View style={{flexDirection: 'row', width: '100%', height: 50}}>
                        <ImageButton
                            style={styles.smallButton}
                            textStyle={styles.buttonText}
                            title={"menu"}
                            source={this.props.button}
                            onPress={() => this.props.navigation.navigate('Level')}/>

                        <ImageButton
                            style={styles.smallButton}
                            textStyle={styles.buttonText}
                            title={"next"}
                            source={this.props.button}
                            onPress={nextGame}/>

                        <ImageButton
                            style={styles.smallButton}
                            textStyle={styles.buttonText}
                            title={"restart"}
                            source={this.props.button}
                            onPress={resetGame}/>
                    </View>

                    <Text style={[styles.title, {color: this.props.color}]}>moves : {this.props.moveCounter}</Text>

                    <View style={{flexDirection: 'row', width: '100%', height: 40, justifyContent: 'space-evenly'}}>
                        <Text style={{color: this.props.color, fontSize: 22}}>target : {this.props.target}</Text>
                        <Text style={{color: this.props.color, fontSize: 22}}>highscore : {this.props.highscore ? this.props.highscore : "none"}</Text>
                    </View>

                    <GameField />
                </View>

                <WinScreen nextGame={nextGame}
                           restart={resetGame}
                           back={back}
                           isVisible={this.props.gameFinished}
                           scoreDict={{target: this.props.target, 'your moves': this.props.moveCounter}}
                           message={this.props.target === this.props.moveCounter ? "Perfect Victory" : "Victory"}/>
            </ImageBackground>

        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('Background', state.settings.theme),
    button: getThemeAsset('Button', state.settings.theme),
    color: getThemeAsset('ContrastColor', state.settings.theme),

    gameFinished : state.game.gameData.isGameFinished && !state.game.moving,
    moveCounter : state.game.gameData.moveCounter,
    levelId : state.game.levelId,
    target : idToDifficulty(state.game.levelId),
    highscore : state.playerData.highscore[state.game.levelId],
});

const mapDispatchToProps = dispatch => ({
    nextGame: () => dispatch(nextGame()),
    resetGame: () => dispatch(gameReset()),
    updateHighscore: (id, score) => dispatch(updateHighscore(id, score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
