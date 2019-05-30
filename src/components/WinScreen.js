// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ImageBackground, Text, Modal , Image , View } from 'react-native';
import {getThemeAsset} from "../styling/Assets";
import {styles} from "../styling/Style";
import ImageButton from "../components/ImageButton";

type WinScreenProps = {
    nextGame : any;
    isVisible : boolean;
    scoreDict : any;
    message: string,

    background? : any;
    win? : any;
    button? : any;
}

class WinScreen extends Component<WinScreenProps, void> {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.nextGame}>

                <View style={styles.winscreenBackground}>
                    <ImageBackground source={this.props.background} style={[styles.winScreen, {paddingTop: 32, paddingBottom: 32}]}>
                        <ImageBackground source={this.props.win} style={{flex: 1}} imageStyle={{resizeMode: 'stretch'}}>
                            <Text style={{fontSize: 40, color: this.props.color, paddingLeft: 25, paddingRight: 25, top : 20}}>{this.props.message}</Text>
                        </ImageBackground>

                        {
                            Object.keys(this.props.scoreDict).map(key => {
                                return  <Text key={key} style={[styles.title, {color: this.props.color, flex: 1, fontSize: 40}]}>
                                            {key} : {this.props.scoreDict[key]}
                                        </Text>
                            })
                        }

                        <ImageButton
                            style={styles.smallButton}
                            textStyle={styles.bigButtonText}
                            title={"next level"}
                            source={this.props.button}
                            onPress={this.props.nextGame}/>
                    </ImageBackground>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('winBackground' , state.settings.theme ),
    win: getThemeAsset('win' , state.settings.theme),
    button: getThemeAsset('Button', state.settings.theme),
    color: getThemeAsset('ConstrastColor', state.settings.theme),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WinScreen);

