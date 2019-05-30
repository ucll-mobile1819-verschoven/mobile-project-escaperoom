// @flow

import React, {Component} from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getAsset, getThemeAsset} from "../styling/Assets";
import ImageButton from "../components/ImageButton";
import {levelData, levelToId} from "../game/GameLevel";
import {setGame} from "../redux/gameRedux";

class LevelScreen extends Component<any, any> {
    constructor(){
        super();

        this.state = {tab : Object.keys(levelData)[0]};
    }

    createGameButton(difficulty, nr) {
        let id = levelToId(this.state.tab, difficulty, nr);
        let score = this.props.highscore[id];

        return (
            <ImageBackground
                source={this.props.button}
                style={[{width: 64, height: 64}, styles.m5]}
                imageStyle={{resizeMode: 'stretch'}}
                key={nr}>

                <ImageButton
                    style={[styles.m5, {width: 54, height: 54}]}
                    textStyle={{color: this.props.color, fontSize: 22}}
                    source={score === parseInt(difficulty) ? getAsset('StarRed') : score ? getAsset('StarYellow') : getAsset('Star')}
                    title={nr + 1}
                    onPress={() => {this.props.setGame(id); this.props.navigation.navigate('Game');}}/>
            </ImageBackground>
        );
    }

    render() {
        const tabData = levelData[this.state.tab];

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

                <View styles={[{flex: 0.05}]}>
                    <View style={[styles.rowFlex, {flexWrap: 'wrap'}]}>
                        {Object.keys(levelData).map(tabName => (
                            <ImageButton
                                key={tabName}
                                style={[{width: 80, margin: 5}]}
                                textStyle={{color: this.props.color, fontSize: 22}}
                                source={this.props.button}
                                title={tabName}
                                onPress={() => {this.setState({tab: tabName});}}/>
                        ))}
                    </View>
                </View>

                <View style={[{flex: 1}]}>
                    {Object.keys(tabData).map(difficulty => (
                        <View key={difficulty} style={[styles.rowFlex]}>
                            <ImageBackground source={getAsset('Hand')} style={{width: 64, height: 64}} imageStyle={[{tintColor: this.props.color}]}>
                                <Text style={{top: 28, left: 4, alignSelf: 'center', fontSize: 26, color: this.props.color}}>{difficulty}</Text>
                            </ImageBackground>

                            {tabData[difficulty].map((value, index) => (
                                this.createGameButton(difficulty, index)
                            ))}
                        </View>
                    ))}
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('Background', state.settings.theme),
    color : getThemeAsset('ContrastColor', state.settings.theme),
    button : getThemeAsset('Button', state.settings.theme),
    highscore : state.playerData.highscore,
});

const mapDispatchToProps = dispatch => ({
    setGame : (id) => dispatch(setGame(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelScreen);

