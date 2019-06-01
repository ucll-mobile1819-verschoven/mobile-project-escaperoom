// @flow

import React, {Component} from 'react';
import {View, Animated, Easing} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {window} from "../styling/Layout";
import FieldSquare from "./FieldSquare";
import PlayerSquare from "./PlayerSquare";
import {getAsset} from "../styling/Assets";
import {Accelerometer} from "expo";

const turnStrength = 4;
const turnSlowness = 7;

class GameFieldBlackout extends Component<any, void> {
    animatedPos: any;
    prevPos: any;
    referenceAngle: any;
    _subscription: any;

    constructor(props : any) {
        super(props);

        this.animatedPos = new Animated.ValueXY({x: -2 * window.width, y: -2 * window.width});
        this.prevPos = {x: -2 * window.width, y: -2 * window.width};
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.shouldResetReferenceAngle !== this.props.shouldResetReferenceAngle){
            this.referenceAngle = null;
        }
    }

    componentDidMount() {
        Accelerometer.setUpdateInterval(25);

        this._subscription = Accelerometer.addListener((result) => {
            if(!this.referenceAngle) this.referenceAngle = Math.atan2(result.y, result.z);

            let y = Math.sin(Math.atan2(result.y, result.z) - this.referenceAngle) / (Math.PI / 4);

            let nextPos = {
                x: Math.min(1, Math.max(-1, -Math.sign(result.z) * result.x * turnStrength)) * window.width / 2 - 2 * window.width,
                y: Math.min(1, Math.max(-1,                               y * turnStrength)) * window.width / 2 - 2 * window.width,
            };

            nextPos.x = (nextPos.x + this.prevPos.x * turnSlowness) / (turnSlowness + 1);
            nextPos.y = (nextPos.y + this.prevPos.y * turnSlowness) / (turnSlowness + 1);

            this.prevPos = nextPos;

            Animated.timing(this.animatedPos, {
                toValue: nextPos,
                duration: 25,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        });
    }

    componentWillUnmount() {
        this._subscription.remove();
    }

    render() {
        let x = -1, y = -1;
        const w = this.props.grid.width();
        const h = this.props.grid.height();
        const squareSize = Math.floor(Math.min(window.width / w, window.height / h));
        const width = squareSize * w;
        const height = squareSize * h;

        return (
            <PlayerSquare style={[styles.gameFieldBorder, {borderColor: 'white'}]} squareSize={squareSize}>

                <View style={{ width: width, height: height}}>
                    {this.props.grid._data.map( row => {
                                y++;
                                x = -1;
                                return row.map( type => {
                                    x++;
                                    return (type !== 'Empty') &&
                                    <FieldSquare
                                        style={{position: "absolute", left: x * squareSize, top: y * squareSize}}
                                        key={x + y * w}
                                        type={type}
                                        size={squareSize}/>;
                                }
                            )
                        }
                    )}
                </View>

                <Animated.Image
                    fadeDuration={0}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        top: 0,
                        width: '500%',
                        height: '500%',
                        transform: [
                            {translateX: this.animatedPos.x},
                            {translateY: this.animatedPos.y},
                        ]
                    }}
                    source={getAsset('Mask')}/>

            </PlayerSquare>
        );
    }
}

const mapStateToProps = state => ({
    grid: state.game.gameData.grid,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GameFieldBlackout);

