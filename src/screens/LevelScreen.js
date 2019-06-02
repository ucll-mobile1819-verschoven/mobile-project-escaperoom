// @flow

import React, {Component} from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getAsset, getThemeAsset} from "../styling/Assets";
import ImageButton from "../components/ImageButton";
import {idToTab, isBlackoutLevel, levelData, levelToId} from "../game/GameLevel";
import {setGame} from "../redux/gameRedux";
import BackButton from "../components/BackButton";
import InfoButton from "../components/InfoButton";

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

    createTabButton(tabName) {
        let borderSize = tabName === this.state.tab ? 3 : 0;
        let margin = 5 - borderSize;

        return (
            <View style={{borderColor: this.props.color, borderWidth: borderSize}} key={tabName}>
                <ImageButton
                    style={[{width: 80, margin: margin}]}
                    textStyle={{color: 'white', fontSize: 22}}
                    source={this.props.button}
                    title={tabName}
                    onPress={() => {this.setState({tab: tabName});}}/>
            </View>
        );
    }

    createGameButton(difficulty, nr) {
        let id = levelToId(this.state.tab, difficulty, nr);
        let score = this.props.highscore[id];
        let borderSize = id === this.props.currentId ? 3 : 0;
        let backgroundSize = 64 - 2 * borderSize;
        let imageMargin = 5 - borderSize;

        let levelImage = isBlackoutLevel(id) ?
            (score === parseInt(difficulty) ? getAsset('FlashlightRed') : score ? getAsset('FlashlightYellow') : getAsset('Flashlight') ) :
            (score === parseInt(difficulty) ? getAsset('StarRed')       : score ? getAsset('StarYellow')       : getAsset('Star') );

        return (
            <View style={{borderColor: this.props.color, borderWidth: borderSize}} key={nr}>
                <ImageBackground
                    source={this.props.button}
                    style={{width: backgroundSize, height: backgroundSize, margin: 5}}
                    imageStyle={{resizeMode: 'stretch'}}>

                    <ImageButton
                        style={{width: 54, height: 54, margin: imageMargin}}
                        textStyle={{color: 'white', fontSize: 22}}
                        source={levelImage}
                        title={nr + 1}
                        onPress={() => {
                            if(this.props.navigation.isFocused()){
                                this.props.setGame(id);
                                this.props.navigation.navigate('Game');
                            }
                        }}/>
                </ImageBackground>
            </View>
        );
    }

    render() {
        const tabData = levelData[this.state.tab];

        return (
            <ImageBackground source={this.props.background} style={[styles.container]}>
                <BackButton onPress={() => this.props.navigation.navigate('Home')} color={this.props.color}/>

                <InfoButton color={this.props.color} background={this.props.background} isFocused={() => this.props.navigation.isFocused()}/>

                <Text style={[styles.title, {color: this.props.color, flex: 0.11, padding: 10}]}>Select a level</Text>

                <View styles={[{flex: 0.05}]}>
                    <View style={[styles.rowFlex, {flexWrap: 'wrap', marginTop: 20}]}>
                        {Object.keys(levelData).map(tabName => (
                            this.createTabButton(tabName)
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
    lightButton : getThemeAsset('LightButton', state.settings.theme),

    highscore : state.playerData.highscore,
    currentId : state.game.levelId,
});

const mapDispatchToProps = dispatch => ({
    setGame : (id) => dispatch(setGame(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelScreen);

