// @flow

import React, {Component} from 'react';
import {View, ImageBackground, Text , TouchableOpacity, Image} from 'react-native';

import {window} from "../styling/Layout";
import {styles} from "../styling/Style";
import {advanceField, generateField} from "../game/GameMechanics";
import type {Field} from "../game/GameMechanics";
import PlayerSquare from "../components/PlayerSquare";
import FieldSquare from "../components/FieldSquare";
import {getThemeAsset} from "../styling/Assets";
import {settings} from "../utilities/Settings";

export default class GameScreen extends Component<any, void> {
    field : Field;

    constructor() {
        super();
        this.field = generateField();
    }

    _checkField() {
        if (this.field.grid.at(this.field.player) === "Finish") {
            alert("you won, congrats!");

            this.field = generateField() ;
            this.forceUpdate();
        }
    }

    _resetField(){

        this.field.player = this.field.start;

        this.forceUpdate();
    }

    render() {
        let id = 0;
        let squareSize = Math.floor(Math.min(window.width / this.field.grid.width(), window.height / this.field.grid.height()));

        return (
            <ImageBackground  source={getThemeAsset('StartScreenBackground')} style={{width: '100%', height: '100%'}}>
                <Text style={styles.titel}>park your car</Text>
                <View style={styles.container}>

                    <PlayerSquare
                        
                            squareSize={squareSize}
                            getPlayer={() => {return this.field.player}}
                            onMove={move => advanceField(this.field, move)}
                            onMoveEnded={() => this._checkField()}
                            highlight={settings.highlight === 'enabled'}
                            rotation={getThemeAsset('PlayerRotation')}>

                        <View style={[{ width: squareSize * this.field.grid.width()  }, styles.gameField ]}>

                            {this.field.grid._data.map(
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
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.touchablesmall}   onPress={() => this.props.navigation.navigate('Home')}>

                            <Image
                                source={getThemeAsset('redbutton')}
                                style={styles.imagesmall} />
                            <View style={styles.viewsmall}>
                                <Text style={styles.textsmall}>back</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchablesmall}   onPress={() => this._resetField() }>

                            <Image
                                source={getThemeAsset('redbutton')}
                                style={styles.imagesmall} />
                            <View style={styles.viewsmall}>
                                <Text style={styles.textsmall}>restart</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchablesmall}   onPress={() => { this.field = generateField();  this.setState({});} }>

                            <Image
                                source={getThemeAsset('redbutton')}
                                style={styles.imagesmall} />
                            <View style={styles.viewsmall}>
                                <Text style={styles.textsmall}>next level</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>
            </ImageBackground>
        );
    }
}
