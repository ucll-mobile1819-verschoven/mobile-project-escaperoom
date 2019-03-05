// @flow

import React, {Component} from 'react';
import {View} from 'react-native';

import {window} from "../constants/Layout";
import {styles} from "../stylesheets/style";
import {advanceField, generateField} from "../game/GameMechanics";
import type {Field} from "../game/GameMechanics";
import PlayerSquare from "../components/PlayerSquare";
import FieldSquare from "../components/FieldSquare";

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
                <PlayerSquare
                        squareSize={squareSize}
                        getPlayer={() => {return this.state.player}}
                        onMove={move => advanceField(this.state, move)}
                        onMoveEnded={() => this._checkField()}
                        highlight={true}>

                    <View style={[{ width: squareSize * this.state.grid.width() }, styles.gameField ]}>
                        {this.state.grid._data.map(
                            row => row.map(
                                x =>
                                    <FieldSquare
                                          key={id++}
                                          type={x}
                                          size={squareSize}/>
                            )
                        )}
                    </View>

                </PlayerSquare>
            </View>
        );
    }
}
