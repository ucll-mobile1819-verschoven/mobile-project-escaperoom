// @flow

import React, {Component} from 'react';
import {View, ImageBackground, Text, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getAsset, getThemeAsset} from "../styling/Assets";
import ImageButton from "../components/ImageButton";
import {levelToId} from "../game/GameLevel";
import {setGame} from "../redux/gameRedux";

class LevelScreen extends Component<any, void> {
    createGameButton(difficulty, nr) {
        let id = levelToId(difficulty, nr);
        let score = this.props.highscore[id];

        return (
            <ImageBackground source={this.props.button} style={[{width: 64, height: 64}, styles.m5]} imageStyle={{resizeMode: 'stretch'}}>
                <ImageButton
                    style={[styles.m5, {width: 54, height: 54}]}
                    textStyle={{color: this.props.color, fontSize: 22}}
                    source={score === difficulty ? getAsset('StarRed') : score ? getAsset('StarYellow') : getAsset('Star')}
                    title={nr}
                    onPress={() => {this.props.setGame(id); this.props.navigation.navigate('Game');}}/>
            </ImageBackground>
        );
    }

    render() {
        let levelData = require('../../assets/levels/levels.json');

        return (
            <ImageBackground source={this.props.background} style={[styles.container]}>
                <Text style={[styles.title, {color: this.props.color, flex: 0.1}]}>Select a level</Text>

                <View style={[styles.rowFlex, styles.m10, {flex: 0.05}]}>
                    <View style={[styles.container, styles.rowFlex]}>
                        <Image source={getAsset('Hand')} style={{width: 32, height: 32, tintColor: this.props.color}}/>
                        <Text style={[{color: this.props.color}]}> = Target move count</Text>
                    </View>

                    <View style={[styles.container, styles.rowFlex]}>
                        <Image source={getAsset('Star')} style={{width: 32, height: 32}}/>
                        <Text style={[{color: this.props.color}]}> = Not yet completed</Text>
                    </View>
                </View>

                <View style={[styles.rowFlex, styles.m10, {flex: 0.05}]}>
                    <View style={[styles.container, styles.rowFlex]}>
                        <Image source={getAsset('StarYellow')} style={{width: 32, height: 32}}/>
                        <Text style={[{color: this.props.color}]}> = Completed</Text>
                    </View>

                    <View style={[styles.container, styles.rowFlex]}>
                        <Image source={getAsset('StarRed')} style={{width: 32, height: 32}}/>
                        <Text style={[{color: this.props.color}]}> = Perfect score</Text>
                    </View>
                </View>

                <ScrollView style={[{flex: 1}]}>
                    {levelData.levels.map(group => (
                        <View key={group.Difficulty} style={[styles.rowFlex]}>
                            <ImageBackground source={getAsset('Hand')} style={{width: 64, height: 64}} imageStyle={[{tintColor: this.props.color}]}>
                                <Text style={{top: 28, left: 4, alignSelf: 'center', fontSize: 26, color: this.props.color}}>{group.Difficulty}</Text>
                            </ImageBackground>

                            {group["Level 1"] && this.createGameButton(group.Difficulty, 1)}
                            {group["Level 2"] && this.createGameButton(group.Difficulty, 2)}
                            {group["Level 3"] && this.createGameButton(group.Difficulty, 3)}
                            {group["Level 4"] && this.createGameButton(group.Difficulty, 4)}
                        </View>
                    ))}
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('Background', state.settings.theme),
    color : getThemeAsset('ConstrastColor', state.settings.theme),
    button : getThemeAsset('Button', state.settings.theme),
    highscore : state.playerData.highscore,
});

const mapDispatchToProps = dispatch => ({
    setGame : (id) => dispatch(setGame(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelScreen);

