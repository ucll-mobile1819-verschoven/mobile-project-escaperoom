// @flow

import React, {Component} from 'react';
import {View, Animated, Easing} from 'react-native';
import {PanGestureHandler, Directions, State} from 'react-native-gesture-handler';

import type {Move} from "../game/GameMechanics";
import {styles} from "../stylesheets/style";

const squareSpeed = 55;                             // = milliseconds to travel across 1 square
const panSpeed = 10;

export default class Player extends Component<any, void> {
    x: Animated.Value;
    y: Animated.Value;
    moving: boolean;

    constructor(props : any) {
        super(props);

        let player = props.getPlayer();
        this.x = new Animated.Value(player.x * props.squareSize);
        this.y = new Animated.Value(player.y * props.squareSize);
        this.moving = false;
    }

    _moveSquare({nativeEvent}: any) {
        if (nativeEvent.oldState === State.ACTIVE && !this.moving) {
            let move : Move;

            if(Math.abs(nativeEvent.velocityX) > Math.abs(nativeEvent.velocityY)){
                if(nativeEvent.velocityX > panSpeed) move = "Right";
                else if(nativeEvent.velocityX < -panSpeed) move = "Left"
                else return;
            } else {
                if(nativeEvent.velocityY > panSpeed) move = "Down";
                else if(nativeEvent.velocityY < -panSpeed) move = "Up";
                else return;
            }

            this.moving = true;

            let {x: old_x, y: old_y} = this.props.getPlayer();
            this.props.onMove(move);
            let {x: new_x, y: new_y} = this.props.getPlayer();

            if(old_x !== new_x) this._animateSquare(this.x, old_x, new_x);
            else if(old_y !== new_y) this._animateSquare(this.y, old_y, new_y);
            else this.moving = false;
        }
    }

    _animateSquare(value : Animated.Value, from : number, to : number) : void {
        Animated.timing(value, {
            toValue: this.props.squareSize * to,
            duration: squareSpeed * Math.abs(to - from),
            easing: Easing.out(Easing.linear)
        }).start(() => this._animationEnded());
    }

    _animationEnded() {
        this.moving = false;

        this.props.onMoveEnded();

        // onMoveEnded might have changed the position, so update the animation
        let {x: new_x, y: new_y} = this.props.getPlayer();
        this.x.setValue(new_x * this.props.squareSize);
        this.y.setValue(new_y * this.props.squareSize);
    }

    render() {
        return (
            <PanGestureHandler hitSlop={{top: 1000, bottom: 1000, left: 1000, right: 1000}} onHandlerStateChange={ev => this._moveSquare(ev)}>
                <View>
                    {this.props.children}

                    <Animated.View style={[
                        styles.playerSquare,
                        {
                            width: this.props.squareSize,
                            height: this.props.squareSize,
                            transform: [
                                {translateX: this.x},
                                {translateY: this.y}
                            ]
                        }
                    ]} />

                    {
                        this.props.highlight
                        &&
                        <Animated.View style={[
                            styles.playerHighlightHorizontal,
                            {
                                height: this.props.squareSize,
                                transform: [
                                    {translateY: this.y}
                                ]
                            }
                        ]}/>
                    }

                    {
                        this.props.highlight
                        &&
                        <Animated.View style={[
                            styles.playerHighlightVertical,
                            {
                                width: this.props.squareSize,
                                transform: [
                                    {translateX: this.x}
                                ]
                            }
                        ]} />
                    }
                </View>
            </PanGestureHandler>
        );
    }
}
