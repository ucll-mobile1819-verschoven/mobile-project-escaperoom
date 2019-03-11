// @flow

import React, {Component} from 'react';
import {View, Animated, Easing, Image} from 'react-native';
import {PanGestureHandler, Directions, State} from 'react-native-gesture-handler';

import type {Move} from "../game/GameMechanics";
import {styles} from "../styling/Style";
import {getThemeAsset} from "../styling/Assets";

const squareSpeed = 55;                             // = milliseconds to travel across 1 square
const turnSpeed = 100;
const panSpeed = 10;
const angles = {
    Left: 0.75,
    Down: 0.5,
    Right: 0.25,
    Up: 0.0
};

export default class PlayerSquare extends Component<any, void> {
    x: Animated.Value;
    y: Animated.Value;
    angle: Animated.Value;
    moving: boolean;

    constructor(props : any) {
        super(props);


        let player = props.getPlayer();
        this.x = new Animated.Value(player.x * props.squareSize);
        this.y = new Animated.Value(player.y * props.squareSize);
        this.angle = new Animated.Value(0);
        this.moving = false;
    }

    _moveSquare({nativeEvent}: any) {
        if (nativeEvent.oldState === State.ACTIVE && !this.moving) {
            let move : Move;

            if(Math.abs(nativeEvent.velocityX) > Math.abs(nativeEvent.velocityY)){
                if(nativeEvent.velocityX > panSpeed) move = "Right";
                else if(nativeEvent.velocityX < -panSpeed) move = "Left";
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

            if(old_x !== new_x) this._rotateSquare(this.x, old_x, new_x, move);
            else if(old_y !== new_y) this._rotateSquare(this.y, old_y, new_y, move);
            else this.moving = false;
        }
    }

    _rotateSquare(value : Animated.Value, from : number, to : number, move : Move) : void {
        if(this.props.rotation){
            let dif = angles[move] - ((this.angle._value % 1) + 1) % 1;
            let change_angle = Math.abs(dif) > 0.6 ? Math.sign(-dif) * 0.25 : dif;
            let to_angle = this.angle._value + change_angle;

            Animated.timing(this.angle, {
                toValue: to_angle,
                duration: turnSpeed,
                easing: Easing.out(Easing.linear)
            }).start(() => this._animateSquare(value, from, to));
        } else {
            this._animateSquare(value, from, to);
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

                    <Animated.Image
                        source={getThemeAsset('Player')}
                        fadeDuration={0}
                        style={[
                            styles.playerSquare,
                            {
                                width: this.props.squareSize,
                                height: this.props.squareSize,
                                transform: [
                                    {translateX: this.x},
                                    {translateY: this.y},
                                    {rotate: this.angle.interpolate(
                                        {
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '360deg']
                                        })
                                    },
                                ]
                            }
                        ]} />

                    {
                        this.props.highlight
                        &&
                        <Animated.View
                            fadeDuration={0}
                            style={[
                                styles.playerHighlightHorizontal,
                                {
                                    height: this.props.squareSize,
                                    transform: [
                                        {translateY: this.y}
                                    ]
                                }
                            ]}
                        />
                    }

                    {
                        this.props.highlight
                        &&
                        <Animated.View
                            fadeDuration={0}
                            style={[
                                styles.playerHighlightVertical,
                                {
                                    width: this.props.squareSize,
                                    transform: [
                                        {translateX: this.x}
                                    ]
                                }
                            ]}
                        />
                    }
                </View>
            </PanGestureHandler>
        );
    }
}
