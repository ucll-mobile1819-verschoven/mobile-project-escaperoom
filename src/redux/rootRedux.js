// @flow

import {combineReducers} from 'redux';
import {settingsReducer} from './settingsRedux';
import {gameReducer} from "./gameRedux";
import {playerDataReducer} from "./playerDataRedux";

export default combineReducers({
    playerData: playerDataReducer,
    game: gameReducer,
    settings: settingsReducer,
});
