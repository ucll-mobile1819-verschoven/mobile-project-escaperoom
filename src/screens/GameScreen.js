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

class GameScreen extends Component<any, void> {
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.gameFinished && this.props.gameFinished){
            this.props.updateHighscore(this.props.levelId, this.props.moveCounter);
        }
    }

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
                            onPress={() => this.props.navigation.navigate('Level')}/>

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

                    <Text style={styles.title}>moves : {this.props.moveCounter}</Text>

                    <GameField />

                    <WinScreen nextGame={this.props.nextGame}
                               isVisible={this.props.gameFinished}
                               scoreDict={{moves:this.props.moveCounter}} />

                </View>
            </ImageBackground>

        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('Background', state.settings.theme),
    button: getThemeAsset('Button', state.settings.theme),
    winBackground : getThemeAsset('winBackground', state.settings.theme),
    win: getThemeAsset('win' , state.settings.theme),

    gameFinished : state.game.gameData.isGameFinished && !state.game.moving,
    moveCounter : state.game.gameData.moveCounter,
    levelId : state.game.levelId,
});

const mapDispatchToProps = dispatch => ({
    nextGame: () => dispatch(nextGame()),
    resetGame: () => dispatch(gameReset()),
    updateHighscore: (id, score) => dispatch(updateHighscore(id, score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
