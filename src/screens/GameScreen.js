// @flow

import React from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { FlingGestureHandler, Directions, State} from 'react-native-gesture-handler';
import {window } from "../constants/Layout";

const colorMap = ['#000000', '#ff0000'];
const squareSize = window.width/6;

export default class GameScreen extends React.Component<void, void> {
    x : Animated.Value;
    y : Animated.Value;
    x_co : any;
    y_co : any;
    moving: boolean;
    grid: Array<Array<number>>;

    constructor(){
        super();

        this.x = new Animated.Value(0);
        this.y = new Animated.Value(0);
        this.x_co = Animated.multiply(this.x, squareSize);
        this.y_co = Animated.multiply(this.y, squareSize);
        this.moving = false;
        this.grid = [
            [0, 0, 1, 0, 0 ,0],
            [0, 0, 0, 1, 0 ,0],
            [0, 1, 0, 0, 0 ,0],
            [0, 0, 1, 0, 0 ,0],
            [0, 0, 1, 0, 0 ,0],
            [0, 0, 0, 0, 1 ,0],
            [0, 0, 1, 0, 0 ,0],
            [0, 0, 0, 0, 0 ,0]
        ];
    }

    static navigationOptions = {
        title: 'Game'
    };

    _moveSquare({ nativeEvent } : any, dir_x: number, dir_y: number) {
        if (nativeEvent.oldState === State.ACTIVE && !this.moving) {
            this.moving = true;
            let x = this.x._value;
            let y = this.y._value;

            if(dir_y !== 0){
                while(y + dir_y >= 0 && y + dir_y < this.grid.length && this.grid[y + dir_y][x] === 0){
                    y += dir_y;
                }

                Animated.timing(this.y, { toValue: y, duration: 100 * Math.abs(this.y._value - y), easing: Easing.out(Easing.linear) }).start(() => { this.moving = false; });
            } else if(dir_x !== 0) {
                while(x + dir_x >= 0 && x + dir_x < this.grid[y].length && this.grid[y][x + dir_x] === 0){
                    x += dir_x;
                }

                Animated.timing(this.x, { toValue: x, duration: 100 * Math.abs(this.x._value - x), easing: Easing.out(Easing.linear) }).start(() => { this.moving = false; });
            }
        }
    }

    render() {
        let id = 0;

        return (
            <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={ev => this._moveSquare(ev, 1, 0)}>
            <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={ev => this._moveSquare(ev, -1, 0)}>
            <FlingGestureHandler direction={Directions.UP} onHandlerStateChange={ev => this._moveSquare(ev, 0, -1)}>
            <FlingGestureHandler direction={Directions.DOWN} onHandlerStateChange={ev => this._moveSquare(ev, 0, 1)}>
                <View style={{width: squareSize * this.grid[0].length, height: squareSize * this.grid.length, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {this.grid.map(
                        row => row.map(
                            x => <View key={id++} style={{ backgroundColor: colorMap[x], width: squareSize, height: squareSize }}/>
                        )
                    )}

                    <Animated.View style={[
                            { backgroundColor: '#00ff00', width: squareSize, height: squareSize, position: 'absolute'},
                            { transform: [ { translateX: this.x_co }, { translateY: this.y_co } ] }
                        ]}
                    />
                </View>
            </FlingGestureHandler>
            </FlingGestureHandler>
            </FlingGestureHandler>
            </FlingGestureHandler>
        );
    }
}
