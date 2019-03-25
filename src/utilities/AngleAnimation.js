// @flow

import {Animated, Easing} from 'react-native';

type Dir = 'Left' | 'Down' | 'Right' | 'Up';

const angles = {
    Left: 0.75,
    Down: 0.5,
    Right: 0.25,
    Up: 0.0
};

export default class AngleAnimation extends Animated.Value {
    turnSpeed: number;
    currentAngle: number;

    constructor(turnSpeed : number){
        super(0);
        this.turnSpeed = turnSpeed;
        this.currentAngle = 0;
    }

    setDir(dir : Dir){
        super.setValue(angles[dir]);
        this.currentAngle = angles[dir];
    }

    turnTo(dir: Dir){
        const a = Math.floor(this.currentAngle) - 1 + angles[dir];
        const b = Math.floor(this.currentAngle) + angles[dir];
        const c = Math.floor(this.currentAngle) + 1 + angles[dir];

        const da = Math.abs(this.currentAngle - a);
        const db = Math.abs(this.currentAngle - b);
        const dc = Math.abs(this.currentAngle - c);

        this.currentAngle = a;
        if(db < da) this.currentAngle = b;
        if(dc < db && dc < da) this.currentAngle = c;

        let quarters = Math.min(da, db, dc) * 4;

        return Animated.timing(this, {
            toValue: this.currentAngle,
            duration: this.turnSpeed * quarters,
            easing: Easing.linear,
            useNativeDriver: true,
        });
    }
}