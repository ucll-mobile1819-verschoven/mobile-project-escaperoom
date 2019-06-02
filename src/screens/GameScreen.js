// @flow

import React, {Component} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getAsset, getThemeAsset} from "../styling/Assets";
import GameField from "../components/GameField";
import GameFieldBlackout from "../components/GameFieldBlackout";
import ImageButton from "../components/ImageButton";
import WinScreen from "../components/WinScreen";
import {nextGame, gameReset, move} from "../redux/gameRedux";
import {updateHighscore} from "../redux/playerDataRedux";
import {idToDifficulty, isBlackoutLevel} from "../game/GameLevel";
import BackButton from "../components/BackButton";

type GameScreenState = {
    shouldResetReferenceAngle : boolean;
    multiDevice : boolean,
}

class GameScreen extends Component<any, GameScreenState> {
    constructor(props : any) {
        super(props);

        this.state = {
            shouldResetReferenceAngle : false,
            multiDevice : false,
        };
    }

    componentWillUnmount() {
        if(this.props.gameFinished && !this.props.moving) {
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

        let back = () => this.props.navigation.navigate('Level');

        return (
            <ImageBackground source={this.props.background} style={styles.container}>
                <BackButton onPress={back} color={this.props.color}/>

                { this.props.isBlackoutLevel &&
                    <ImageButton
                        title={''}
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        style={{width: 50, height: 50, position: 'absolute', top: 0, right: 0, margin: 2, zIndex: 1}}
                        imageStyle={{tintColor: 'white'}}
                        source={getAsset('Center')}
                        onPress={() => this.setState({shouldResetReferenceAngle: !this.state.shouldResetReferenceAngle})}/>
                }

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

                { this.props.isBlackoutLevel ?
                    <GameFieldBlackout multiDevice={this.state.multiDevice} shouldResetReferenceAngle={this.state.shouldResetReferenceAngle}/> :
                    <GameField multiDevice={this.state.multiDevice}/>
                }

                <View style={{backgroundColor: backgroundColor, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ImageButton
                        style={{margin: 7, width: '66%'}}
                        textStyle={styles.buttonText}
                        title={this.state.multiDevice ? 'Disconnect' : 'Play multi-device'}
                        source={this.props.button}
                        onPress={() => this.setState({multiDevice : !this.state.multiDevice})}/>
                </View>

                <WinScreen nextGame={nextGame}
                           restart={resetGame}
                           back={back}
                           isVisible={this.props.gameFinished && !this.props.moving}
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

    gameFinished : state.game.gameData.isGameFinished,
    moving : state.game.moving,
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
