// @flow

import React, {Component} from 'react';
import {getAsset, getThemeAsset} from "../styling/Assets";
import {Image, ImageBackground, Text, View} from 'react-native';
import {window} from "../styling/Layout";
import ImageButton from "../components/ImageButton";
import {styles} from "../styling/Style";

type InfoButtonProps= {
    color: string;
    background : any;
}
type InfoButtonState ={
    active : boolean
}

export default class InfoButton extends Component<InfoButtonProps, InfoButtonState> {

    constructor(props){
        super(props);
        this.state = {active : false};
    }
    render() {
        return (
            <View>
            <ImageButton
                title={''}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                style={{width: 50, height: 50, position: 'absolute', top: 0, right: 0, margin: 2, zIndex: 6}}
                imageStyle={{tintColor: this.props.color}}
                source={getAsset('Info')}
                onPress={()=>this.setState({active : !this.state.active})}/>
                {this.state.active &&

                <View style={  {

                    position: 'absolute',
                    width: window.width,
                    height: window.height,
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 0,
                    left: 0,
                    backgroundColor: "#0009",
                    zIndex: 5,}}>
                    <ImageBackground source={this.props.background}imageStyle = {{borderRadius: 45}} style ={{resizeMode:'stretch',marginLeft : 5,marginRight : 5, marginTop : 35, marginBottom : 35,  alignItems: 'flex-start',
                        justifyContent: 'center' }}>

                        <View style={[styles.container, styles.rowFlex, styles.centered]}>
                            <Image source={getAsset('Hand')} style={{width: 60, height: 60, tintColor: this.props.color}}/>
                            <Text style={[{color: this.props.color , fontSize : 25}]}> Target move count</Text>
                        </View>

                        <View style={[styles.container, styles.rowFlex , styles.centered]}>
                            <Image source={getAsset('Star')} style={{width: 60, height: 60}}/>
                            <Text style={[{color: this.props.color , fontSize : 25}]}> Not yet completed</Text>
                        </View>



                        <View style={[styles.container, styles.rowFlex , styles.centered]}>
                            <Image source={getAsset('StarYellow')} style={{width: 60, height: 60}}/>
                            <Text style={[{color: this.props.color , fontSize : 25}]}> Completed</Text>
                        </View>

                        <View style={[styles.container, styles.rowFlex , styles.centered]}>
                            <Image source={getAsset('StarRed')} style={{width: 60, height: 60}}/>
                            <Text style={[{color: this.props.color , fontSize : 25}]}> Perfect score</Text>

                    </View>
                    </ImageBackground>
                </View>

                }

            </View>


        )
    }
}