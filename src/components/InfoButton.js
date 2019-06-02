// @flow

import React, {Component} from 'react';
import {getAsset} from "../styling/Assets";
import {Image, ImageBackground, Text, View, BackHandler} from 'react-native';
import {window} from "../styling/Layout";
import ImageButton from "../components/ImageButton";
import {styles} from "../styling/Style";

type InfoButtonProps= {
    color: string;
    background : any;
    isFocused : any;
}
type InfoButtonState ={
    active : boolean
}

export default class InfoButton extends Component<InfoButtonProps, InfoButtonState> {
    backHandler : any;

    constructor(props){
        super(props);
        this.state = {active : false};
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if(this.state.active && this.props.isFocused()) {
                this.setState({active : false});
                return true;
            }

            return false;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    render() {
        return (
            <View>
                <ImageButton
                    title={''}
                    hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                    style={{width: 50, height: 50, position: 'absolute', top: 0, right: 0, margin: 2, zIndex: 6}}
                    imageStyle={{tintColor: this.state.active ? 'white' : this.props.color}}
                    source={getAsset('Info')}
                    onPress={()=>this.setState({active : !this.state.active})}/>

                {this.state.active &&
                    <View style={{
                        position: 'absolute',
                        width: window.width,
                        height: window.height,
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 0,
                        left: 0,
                        backgroundColor: "#0009",
                        zIndex: 5,
                    }}>
                        <ImageBackground
                            source={this.props.background}
                            imageStyle = {{
                                borderRadius: 20,
                                resizeMode:'cover',
                            }}
                            style ={{
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}>

                            <View style={[styles.rowFlex, styles.centered, {padding: 10}]}>
                                <Image source={getAsset('Hand')} style={{width: 60, height: 60, tintColor: this.props.color}}/>
                                <Text style={[{color: this.props.color , fontSize : 25}]}> Target move count</Text>
                            </View>

                            <View style={[styles.rowFlex , styles.centered, {padding: 10}]}>
                                <Image source={getAsset('Star')} style={{width: 60, height: 60}}/>
                                <Text style={[{color: this.props.color , fontSize : 25}]}> Not yet completed</Text>
                            </View>

                            <View style={[styles.rowFlex , styles.centered, {padding: 10}]}>
                                <Image source={getAsset('Flashlight')} style={{width: 60, height: 60}}/>
                                <Text style={[{color: this.props.color , fontSize : 25}]}> Not yet completed {'\n'} blackout level</Text>
                            </View>

                            <View style={[styles.rowFlex , styles.centered, {padding: 10}]}>
                                <Image source={getAsset('StarYellow')} style={{width: 60, height: 60}}/>
                                <Text style={[{color: this.props.color , fontSize : 25}]}> Completed</Text>
                            </View>

                            <View style={[styles.rowFlex , styles.centered, {padding: 10}]}>
                                <Image source={getAsset('FlashlightYellow')} style={{width: 60, height: 60}}/>
                                <Text style={[{color: this.props.color , fontSize : 25}]}> Completed {'\n'} blackout level</Text>
                            </View>

                            <View style={[styles.rowFlex , styles.centered, {padding: 10}]}>
                                <Image source={getAsset('StarRed')} style={{width: 60, height: 60}}/>
                                <Text style={[{color: this.props.color , fontSize : 25}]}> Perfect score</Text>
                            </View>

                            <View style={[styles.rowFlex , styles.centered, {padding: 10}]}>
                                <Image source={getAsset('FlashlightRed')} style={{width: 60, height: 60}}/>
                                <Text style={[{color: this.props.color , fontSize : 25}]}> Perfect score {'\n'} blackout level</Text>
                            </View>
                        </ImageBackground>
                    </View>
                }
            </View>
        )
    }
}
