// @flow

import React, {Component} from 'react';
import {View} from 'react-native';

import {window} from "../constants/Layout";
import {styles} from "../stylesheets/style";
import {colors} from "../constants/Colors"
import Player from "../components/Player";
import {advanceField, generateField} from "../game/GameMechanics";
import type {Field, Move} from "../game/GameMechanics";

export default class GameScreen extends Component<any, Field> {
    constructor() {
        super();
        this.state = generateField();
    }

    _checkField() {
        if (this.state.grid.at(this.state.player) === "Finish") {
            alert("you won, congrats!");

            this.setState(generateField());
        }
    }

    render() {
        let id = 0;
        let squareSize = Math.floor(Math.min(window.width / this.state.grid.width(), window.height / this.state.grid.height()));

        return (
            <View style={styles.container}>
                <Player squareSize={squareSize}
                        getPlayer={() => {return this.state.player}}
                        onMove={move => advanceField(this.state, move)}
                        onMoveEnded={() => this._checkField()}
                        highlight={true}>

                    <View style={[{ width: squareSize * this.state.grid.width() }, styles.gameField ]}>
                        {this.state.grid._data.map(
                            row => row.map(
                                x =>
                                    <View key={id++} style={{
                                        backgroundColor: colors[x],
                                        width: squareSize,
                                        height: squareSize
                                    }}/>
                            )
                        )}
                    </View>

                </Player>
            </View>
        );
    }
}
