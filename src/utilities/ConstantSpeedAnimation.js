// @flow

import {Animated, Easing} from 'react-native';
import {Vec2} from "./Mathematics";

export default class ConstantSpeedAnimation extends Animated.ValueXY {
    movementSpeed: number;
    currentPosition: Vec2;

    constructor(pos : Vec2, movementSpeed : number){
        super(pos);
        this.movementSpeed = movementSpeed;
        this.currentPosition = pos;
    }

    setValue(pos : any) {
        super.setValue(pos);
        this.currentPosition = pos;
    }

    moveTo(pos : Vec2) {
        const duration = this.movementSpeed * Math.max(Math.abs(this.currentPosition.x - pos.x), Math.abs(this.currentPosition.y - pos.y)) + 1;
        this.currentPosition = pos;

        return Animated.timing(this, {
            toValue: this.currentPosition,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
        });
    }
}