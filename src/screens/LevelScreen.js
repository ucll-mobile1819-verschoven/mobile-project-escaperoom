// @flow

import React, {Component} from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getAsset, getThemeAsset} from "../styling/Assets";
import ImageButton from "../components/ImageButton";
import {idToTab, levelData, levelToId} from "../game/GameLevel";
import {setGame} from "../redux/gameRedux";

class LevelScreen extends Component<any, any> {
    constructor(){
        super();

        this.state = {tab : Object.keys(levelData)[0]};
    }

    componentWillUpdate(nextProps, nextState){
        if(this.props.currentId !== nextProps.currentId){
            this.state.tab = idToTab(nextProps.currentId);
        }
    }

    createGameButton(difficulty, nr) {
        let id = levelToId(this.state.tab, difficulty, nr);
        let score = this.props.highscore[id];
        let borderSize = id === this.props.currentId ? 3 : 0;
        let backgroundSize = 64 - 2 * borderSize;
        let imageMargin = 5 - borderSize;

        return (
            <View style={{borderColor: this.props.color, borderWidth: borderSize}} key={nr}>
                <ImageBackground
                    source={this.props.button}
                    style={{width: backgroundSize, height: backgroundSize, margin: 5}}
                    imageStyle={{resizeMode: 'stretch'}}>

                    <ImageButton
                        style={{width: 54, height: 54, margin: imageMargin}}
                        textStyle={{color: this.props.color, fontSize: 22}}
                        source={score === parseInt(difficulty) ? getAsset('StarRed') : score ? getAsset('StarYellow') : getAsset('Star')}
                        title={nr + 1}
                        onPress={() => {this.props.setGame(id); this.props.navigation.navigate('Game');}}/>
                </ImageBackground>
            </View>
        );
    }

    render() {
        const tabData = levelData[this.state.tab];

        return (
            <ImageBackground source={this.props.background} style={[styles.container]}>
                <ImageButton
                    title={''}
                    hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}
                    style={{width: 50, height: 37, position: 'absolute', top: 0, left: 0, margin: 2, zIndex: 1}}
                    imageStyle={{tintColor: this.props.color}}
                    source={getAsset('Back')}
                    onPress={() => this.props.navigation.navigate('Home')}/>

                <Text style={[styles.title, {color: this.props.color, flex: 0.11, padding: 10}]}>Select a level</Text>

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
                    <View style={[styles.rowFlex, {flexWrap: 'wrap', marginTop: 20}]}>
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

                <View style={[{flex: 1, marginTop: 20}]}>
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
    currentId : state.game.levelId,
});

const mapDispatchToProps = dispatch => ({
    setGame : (id) => dispatch(setGame(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelScreen);

