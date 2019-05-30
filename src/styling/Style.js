// @flow

import {StyleSheet} from 'react-native'

import {colors} from "./Colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowFlex:{
        flexDirection: 'row'
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameFieldBorder: {
        borderTopWidth: 2,
        borderBottomWidth : 2,
        borderColor: colors.Wall,
    },
    playerSquare : {
        position: 'absolute',
    },
    playerHighlightHorizontal : {
        position: 'absolute',
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.PlayerColor,
    },
    playerHighlightVertical : {
        position: 'absolute',
        top: 0,
        bottom: 0,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.PlayerColor,
    },
    title : {
        fontSize: 40,
        textAlign: 'center'
    },
    menuButton : {
        width: "50%",
        height: "10%",
    },
    smallButton : {
        flex: 1,
        margin: 7
    },
    m5 : {
        margin: 5
    },
    m10 : {
        margin : 10
    },
    bigButtonText: {
        color: colors.white,
        fontSize: 40,
        textAlign: 'center'
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        textAlign: 'center'
    },

    winScreen:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop : 60,
        marginBottom : 60,
        resizeMode: 'contain',
        flex : 1,
    },
    winScreenButton : {
        flex : 1 ,
        margin :10,
    },
    winscreenBackground : {
        height: "100%",
        width: "100%",
        backgroundColor: "#0009",

    }
});
