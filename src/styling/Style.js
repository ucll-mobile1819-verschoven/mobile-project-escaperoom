// @flow

import {StyleSheet} from 'react-native'

import {colors} from "./Colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameField: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        color: colors.white,
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
    buttonText: {
        color: colors.white,
        fontSize: 18,
        textAlign: 'center'
    },

    winScreen:{
        alignItems: 'center',
        justifyContent: 'center',
        opacity : 1,
        backgroundColor: '#9FA8DA',
        borderWidth : 3,
        margin : "10%",
        width: "80%",
        height: "40%",
        flex : 1,
    },
    winScreenButton : {
        flex : 1 ,
        margin :10,
    }
});
