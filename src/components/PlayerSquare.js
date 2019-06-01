// @flow

import React, {Component} from 'react';
import {View, Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getThemeAsset} from "../styling/Assets";
import AngleAnimation from "../utilities/AngleAnimation";
import {move, moveEnded} from "../redux/gameRedux";
import ConstantSpeedAnimation from "../utilities/ConstantSpeedAnimation";

const panSpeed = 1;
const turnSpeed = 50;

class PlayerSquare extends Component<any, void> {
    position: ConstantSpeedAnimation;
    angle: AngleAnimation;

    constructor(props : any){
        super(props);

        this.resetAnimations();
    }

    resetAnimations() {
        this.position = new ConstantSpeedAnimation(this.props.position.mul(this.props.squareSize), this.props.carSpeed);
        this.angle = new AngleAnimation(this.props.carSpeed * turnSpeed);
        this.angle.setDir(this.props.moveDir);
    }

    componentWillUpdate(nextProps, nextState){
        if(nextProps.moving){
            if(this.props.moving && this.props.position.equals(nextProps.position)) return;

            let animations = [];

            if(nextProps.rotation) animations.push(this.angle.turnTo(nextProps.moveDir));
            animations.push(this.position.moveTo(nextProps.position.mul(nextProps.squareSize)));

            Animated.sequence(animations).start(nextProps.onMoveEnded);
        }
    }

    _moveSquare({nativeEvent} : any) {
        if (nativeEvent.oldState === State.ACTIVE) {
            if(Math.abs(nativeEvent.velocityX) > Math.abs(nativeEvent.velocityY)){
                if(nativeEvent.velocityX > panSpeed)    this.props.onMove("Right");
                if(nativeEvent.velocityX < -panSpeed)   this.props.onMove("Left");
            } else {
                if(nativeEvent.velocityY > panSpeed)    this.props.onMove("Down");
                if(nativeEvent.velocityY < -panSpeed)   this.props.onMove("Up");
            }
        }
    }

    render() {
        return (
            <PanGestureHandler
                hitSlop={{top: 1000, bottom: 1000, left: 1000, right: 1000}}
                onHandlerStateChange={ev => this._moveSquare(ev)}>

                <View style={this.props.style}>
                    {this.props.children}

                    <Animated.Image
                        source={this.props.player}
                        fadeDuration={0}
                        style={[
                            styles.playerSquare,
                            {
                                width: this.props.squareSize,
                                height: this.props.squareSize,
                                transform: [
                                    {translateX: this.position.x},
                                    {translateY: this.position.y},
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
                                        {translateY: this.position.y}
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
                                        {translateX: this.position.x}
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

const mapStateToProps = state => ({
    position: state.game.gameData.player,
    moveDir: state.game.gameData.moveDir,
    moving: state.game.moving,

    highlight: state.settings.highlight === 'Enabled',
    rotation: getThemeAsset('PlayerRotation', state.settings.theme),
    player: getThemeAsset('Player', state.settings.theme),
    carSpeed: parseFloat(state.settings.carSpeed),
});

const mapDispatchToProps = dispatch => ({
    onMove: dir => dispatch(move(dir)),
    onMoveEnded: () => dispatch(moveEnded()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSquare);
