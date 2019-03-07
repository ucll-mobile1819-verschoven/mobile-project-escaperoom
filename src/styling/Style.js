// @flow

import {StyleSheet} from 'react-native'

import {colors} from "./Colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    controls: {
        marginTop: 10
    },
    gameField: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        /*borderWidth: 0.5,
        borderColor: colors.PlayerColor, */

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
    titel : {
        color: colors.white,
        fontSize: 40,
        textAlign: 'center'
    },


    /* test voor buttons */
    view: {

        position: 'absolute',
        backgroundColor: 'transparent'
    },
    image: {

        width: 250,
        resizeMode: 'contain'
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: colors.white,
        fontSize: 18,
        textAlign: 'center'
    },
});
