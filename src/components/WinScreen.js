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
                <ImageBackground source={this.props.background} style={styles.winScreen}>
                    <Image
                        style={{flex: 1}}
                        source={this.props.win}/>

                    {
                        Object.keys(this.props.scoreDict).map(key => {
                            return  <Text key = {key} style={styles.title}>{key} : {this.props.scoreDict[key]}</Text>
                        })
                    }

                    <ImageButton
                        style={styles.smallButton}
                        textStyle={styles.buttonText}
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
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WinScreen);

