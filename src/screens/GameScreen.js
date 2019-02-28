// @flow

import React, {Component} from 'react';
import {View, Text, Animated, Easing, TouchableOpacity} from 'react-native';
import {FlingGestureHandler, Directions, State} from 'react-native-gesture-handler';

import {window} from "../constants/Layout";
import {styles} from "../stylesheets/style";
import * as game from "../game/GameMechanics"

const colorMap = {
    Empty: '#000000',
    Wall: '#ff0000',
    Finish: '#0000ff',
};
const playerColor = '#00ff00';
const SquareSpeed = 70;                             // = milliseconds to travel across 1 square

export default class GameScreen extends Component<any, game.Field> {
    squareSize : number;
    x: Animated.Value;
    y: Animated.Value;
    moving: boolean;

    constructor() {
        super();

        this.state = game.generateField();
        this.squareSize = Math.min(window.width / this.state.grid.width(), window.height / this.state.grid.height());
        this.x = new Animated.Value(this.state.player.x * this.squareSize);
        this.y = new Animated.Value(this.state.player.y * this.squareSize);
        this.moving = false;
    }

    _moveSquare({nativeEvent}: any, move : game.Move) {
        if (nativeEvent.oldState === State.ACTIVE && !this.moving) {
            this.moving = true;

            let prev_pos = this.state.player;
            game.advanceField(this.state, move);
            let new_pos = this.state.player;

            if(prev_pos.x !== new_pos.x) this._animateSquare(this.x, prev_pos.x, new_pos.x);
            else if(prev_pos.y !== new_pos.y) this._animateSquare(this.y, prev_pos.y, new_pos.y);
            else this.moving = false;
        }
    }

    _animateSquare(value : Animated.Value, from : number, to : number) : void {
        Animated.timing(value, {
            toValue: this.squareSize * to,
            duration: SquareSpeed * Math.abs(to - from),
            easing: Easing.out(Easing.linear)
        }).start(() => this._animationEnded());
    }

    _animationEnded() {
        this.moving = false;

        if (this.state.grid.at(this.state.player) === "Finish") {
            alert("you won, congrats!");
            this._generate_level();
        }
    }

    _generate_level() {
        let field = game.generateField();

        this.squareSize = Math.min(window.width / field.grid.width(), window.height / field.grid.height());
        this.x.setValue(field.player.x * this.squareSize);
        this.y.setValue(field.player.y * this.squareSize);

        this.setState(field);
    }

    render() {
        let id = 0;

        return (
            <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={ev => this._moveSquare(ev, "Right")}>
            <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={ev => this._moveSquare(ev, "Left")}>
            <FlingGestureHandler direction={Directions.UP} onHandlerStateChange={ev => this._moveSquare(ev, "Up")}>
            <FlingGestureHandler direction={Directions.DOWN} onHandlerStateChange={ev => this._moveSquare(ev, "Down")}>
                <View style={styles.container}>
                    <View style={[{ width: this.squareSize * this.state.grid.width() + 1 }, styles.gameField ]}>
                        {this.state.grid._data.map(
                            row => row.map(
                                x => <View key={id++} style={{
                                    backgroundColor: colorMap[x],
                                    width: this.squareSize,
                                    height: this.squareSize
                                }}/>
                            )
                        )}

                        <Animated.View style={[
                            {
                                backgroundColor: playerColor,
                                position: 'absolute',
                                width: this.squareSize,
                                height: this.squareSize,
                            },
                            {transform: [
                                {translateX: this.x},
                                {translateY: this.y}
                            ]}
                        ]}
                        />
                    </View>
                </View>
            </FlingGestureHandler>
            </FlingGestureHandler>
            </FlingGestureHandler>
            </FlingGestureHandler>
        );
    }
}
