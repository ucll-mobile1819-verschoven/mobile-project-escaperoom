// @flow

import React, {Component} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {getThemeAsset} from "../styling/Assets";
import {deleteAllData, setSetting, toggleSetting} from "../redux/settingsRedux";
import ImageButton from "../components/ImageButton";
import ImageSlider from "../components/ImageSlider";
import BackButton from "../components/BackButton";

type SettingsScreenState = {
    deleteState : number,
}

class SettingsScreen extends Component<any, SettingsScreenState> {
    constructor(props) {
        super(props);

        this.state = {deleteState : 0};
    }

    onPressDeleteData() {
        if(this.state.deleteState === 1) {
            this.props.deleteData();
        }

        this.setState({deleteState : (this.state.deleteState + 1) % 3});
    }

    render() {
        let deleteDataText = '';
        switch (this.state.deleteState) {
            case 0 : deleteDataText = 'DANGER:\nDelete all data'; break;
            case 1 : deleteDataText = 'DANGER:\nAre you sure?'; break;
            case 2 : deleteDataText = 'Data deleted'; break;
        }

        return (
            <ImageBackground  source={this.props.background} style={styles.container}>
                <BackButton onPress={() => this.props.navigation.navigate('Home')} color={this.props.color}/>

                <View style={[styles.container, styles.centered]}>

                    <Text style={[{color: this.props.color, fontSize: 30, textAlign: 'center', width: '70%'}]}>
                        Click on a setting to change it
                    </Text>

                    <ImageButton
                        style={[styles.m10, styles.menuButton]}
                        textStyle={styles.buttonText}
                        title={"Color theme: \n" + this.props.theme}
                        source={this.props.button}
                        onPress={this.props.changeTheme}/>

                    <ImageButton
                        style={[styles.m10, styles.menuButton]}
                        textStyle={styles.buttonText}
                        title={"Guide lines: \n" + this.props.highlight}
                        source={this.props.button}
                        onPress={this.props.changeHighlight}/>

                    <ImageSlider
                        style={[styles.m10, styles.menuButton]}
                        textStyle={styles.buttonText}
                        sliderStyle={{width: 180}}
                        title={"Car speed"}
                        source={this.props.button}
                        step={0.1}
                        minimumValue={5}
                        maximumValue={9.9}
                        onValueChange={this.props.changeCarSpeed}
                        value={this.props.carSpeed}/>

                    <ImageButton
                        style={[styles.m10, styles.menuButton]}
                        textStyle={styles.buttonText}
                        title={deleteDataText}
                        source={this.props.button}
                        onPress={() => this.onPressDeleteData()}/>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    background : getThemeAsset('Background', state.settings.theme),
    button: getThemeAsset('Button', state.settings.theme),
    color: getThemeAsset('ContrastColor', state.settings.theme),

    theme: state.settings.theme,
    highlight: state.settings.highlight,
    carSpeed : 10 - parseFloat(state.settings.carSpeed),
});

const mapDispatchToProps = dispatch => ({
    changeTheme: () => dispatch(toggleSetting('theme')),
    changeHighlight: () => dispatch(toggleSetting('highlight')),
    changeCarSpeed : value => dispatch(setSetting('carSpeed', (10 - value).toString())),
    deleteData : () => dispatch(deleteAllData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
