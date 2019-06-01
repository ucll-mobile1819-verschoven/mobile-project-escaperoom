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

const turnStrength = 2;
const turnSlowness = 7;

class GameField extends Component<any, void> {
    animatedPos: any;
    referencePos: any;
    prevPos: any;
    _subscription: any;

    constructor(props : any) {
        super(props);

        this.animatedPos = new Animated.ValueXY({x: -1.5 * window.width, y: -1.5 * window.width});
        this.prevPos = {x: -1.5 * window.width, y: -1.5 * window.width};
    }

    componentDidMount() {
        Accelerometer.setUpdateInterval(25);

        this._subscription = Accelerometer.addListener((result) => {
            if(!this.referencePos) this.referencePos = {x: result.x, y: result.y};

            result.x -= this.referencePos.x;
            result.y -= this.referencePos.y;

            let nextPos = {
                x: -result.x * window.width / 2 * turnStrength - 1.5 * window.width,
                y: result.y * window.width / 2 * turnStrength - 1.5 * window.width,
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
            <PlayerSquare style={styles.gameFieldBorder} squareSize={squareSize}>

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
                        width: '400%',
                        height: '400%',
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

export default connect(mapStateToProps, mapDispatchToProps)(GameField);

