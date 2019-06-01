// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ImageBackground, Text, View } from 'react-native';
import {getThemeAsset} from "../styling/Assets";
import {styles} from "../styling/Style";
import ImageButton from "../components/ImageButton";
import BackButton from "./BackButton";

type WinScreenProps = {
    nextGame : any;
    restart : any;

    isVisible : boolean;
    scoreDict : any;
    message: string;

    background? : any;
    win? : any;
    button? : any;
}

class WinScreen extends Component<WinScreenProps, void> {
    render() {
        if(!this.props.isVisible) {
            return <View style={{width: 0, height: 0}}/>;
        }

        return <View style={styles.winscreenBackground}>
                    <BackButton onPress={this.props.restart} color={'white'}/>

                    <ImageBackground source={this.props.background} style={[styles.winScreen]}>
                        <ImageBackground source={this.props.win} style={{flex: 1, marginTop: 32}} imageStyle={{resizeMode: 'stretch'}}>
                            <Text style={{fontSize: 40, color: this.props.color, paddingLeft: 25, paddingRight: 25, top : 9}}>{this.props.message}</Text>
                        </ImageBackground>

                        {
                            Object.keys(this.props.scoreDict).map(key => {
                                return  <Text key={key} style={[styles.title, {color: this.props.color, flex: 1, fontSize: 40}]}>
                                            {key} : {this.props.scoreDict[key]}
                                        </Text>
                            })
                        }

                        <ImageButton
                            style={{flex: 1, width: '50%', marginBottom: 32}}
                            textStyle={styles.bigButtonText}
                            title={"next"}
                            source={this.props.button}
                            onPress={this.props.nextGame}/>

                        <ImageButton
                            style={{flex: 1, width: '50%', marginBottom: 32}}
                            textStyle={styles.bigButtonText}
                            title={"redo"}
                            source={this.props.button}
                            onPress={this.props.restart}/>
                    </ImageBackground>
                </View>;
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('winBackground' , state.settings.theme ),
    win: getThemeAsset('win' , state.settings.theme),
    button: getThemeAsset('Button', state.settings.theme),
    color: getThemeAsset('ContrastColor', state.settings.theme),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WinScreen);

