// @flow

import {combineReducers} from 'redux';
import {settingsReducer} from './settingsRedux';
import {gameReducer} from "./gameRedux";

export default combineReducers({
    settings: settingsReducer,
    game: gameReducer,
});
