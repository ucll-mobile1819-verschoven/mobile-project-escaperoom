// @flow

import React, {Component} from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getThemeAsset} from "../styling/Assets";
import GameField from "../components/GameField";
import GameFieldBlackout from "../components/GameFieldBlackout";
import ImageButton from "../components/ImageButton";
import WinScreen from "../components/WinScreen";
import {nextGame, gameReset} from "../redux/gameRedux";
import {updateHighscore} from "../redux/playerDataRedux";
import {idToDifficulty, isBlackoutLevel} from "../game/GameLevel";
import BackButton from "../components/BackButton";

class GameScreen extends Component<any, void> {
    componentWillUnmount() {
        if(this.props.gameFinished) {
            this.props.resetGame();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.gameFinished && this.props.gameFinished){
            this.props.updateHighscore(this.props.levelId, this.props.moveCounter);
        }
    }

    render() {
        let backgroundColor = this.props.isBlackoutLevel ? 'black' : '#0000';

        let nextGame = () => {
            this.props.nextGame();
            this.props.navigation.replace('Game');
        };

        let resetGame = () => {
            this.props.resetGame();
            this.props.navigation.replace('Game');
        };

        return (
            <ImageBackground source={this.props.background} style={styles.container}>
                <BackButton onPress={() => this.props.navigation.navigate('Level')} color={this.props.color}/>

                <View style={{flexDirection: 'row', width: '100%', height: 50, justifyContent: 'center', backgroundColor: backgroundColor}}>
                    <ImageButton
                        style={{margin: 7, width: '33%'}}
                        textStyle={styles.buttonText}
                        title={"next"}
                        source={this.props.button}
                        onPress={nextGame}/>

                    <ImageButton
                        style={{margin: 7, width: '33%'}}
                        textStyle={styles.buttonText}
                        title={"restart"}
                        source={this.props.button}
                        onPress={resetGame}/>
                </View>

                <Text style={[styles.title, {color: this.props.color, backgroundColor: backgroundColor}]}>
                    moves : {this.props.moveCounter}
                </Text>

                <View style={{flexDirection: 'row', width: '100%', height: 40, justifyContent: 'space-evenly', backgroundColor: backgroundColor}}>
                    <Text style={{color: this.props.color, fontSize: 22}}>target : {this.props.target}</Text>
                    <Text style={{color: this.props.color, fontSize: 22}}>highscore : {this.props.highscore ? this.props.highscore : "none"}</Text>
                </View>

                { this.props.isBlackoutLevel ? <GameFieldBlackout/> : <GameField/> }

                <View style={[{flexDirection: 'row', backgroundColor: backgroundColor, flex: 1}, styles.centered]}>
                    <Image style={{width: 64, height: 64}} source={this.props.player}/>
                    <Text style={{fontSize: 30, color: this.props.color}}> ====> </Text>
                    <Image style={{width: 64, height: 64}} source={this.props.finish}/>
                </View>

                <WinScreen nextGame={nextGame}
                           restart={resetGame}
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
    color: isBlackoutLevel(state.game.levelId) ? 'white' : getThemeAsset('ContrastColor', state.settings.theme),
    player: getThemeAsset('Player', state.settings.theme),
    finish: getThemeAsset('Finish', state.settings.theme),

    gameFinished : state.game.gameData.isGameFinished && !state.game.moving,
    moveCounter : state.game.gameData.moveCounter,
    levelId : state.game.levelId,
    target : idToDifficulty(state.game.levelId),
    highscore : state.playerData.highscore[state.game.levelId],
    isBlackoutLevel: isBlackoutLevel(state.game.levelId),
});

const mapDispatchToProps = dispatch => ({
    nextGame: () => dispatch(nextGame()),
    resetGame: () => dispatch(gameReset()),
    updateHighscore: (id, score) => dispatch(updateHighscore(id, score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
