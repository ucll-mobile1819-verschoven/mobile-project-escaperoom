import {levelToGame, movePlayer, resetGame} from "../game/GameMechanics";
import {copyAndSet} from "./utilRedux";
import {idToLevel, nextLevelId} from "../game/GameLevel";

const actions = {
    reset_game: 'RESET_GAME',
    set_game: 'SET_GAME',
    next_game: 'NEXT_GAME',
    move: 'MOVE',
    moveEnded: 'MOVE_ENDED',
};

const initialState = {
    moving: false,
    levelId: "",
    gameData: {}
};

export const gameReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.reset_game: {
            return copyAndSet(state, {moving: false, gameData: resetGame(state.gameData)});
        }
        case actions.set_game: {
            let new_id = action.payload;
            if(new_id === state.levelId) return state;
            return copyAndSet(state, {moving: false, levelId: new_id, gameData: levelToGame(idToLevel(new_id))});
        }
        case actions.next_game: {
            let new_id = nextLevelId(state.levelId);
            return copyAndSet(state, {moving: false, levelId: new_id, gameData: levelToGame(idToLevel(new_id))});
        }
        case actions.move: {
            if(state.moving || state.gameData.isGameFinished) return state;

            return copyAndSet(state, {moving: true, gameData: movePlayer(state.gameData, action.payload)});
        }
        case actions.moveEnded: {
            return copyAndSet(state, {moving: false});
        }

        default: return state;
    }
};

export const gameReset = () => ({
    type: actions.reset_game,
    payload: '',
});

export const setGame = (id) => ({
    type: actions.set_game,
    payload: id
});

export const nextGame = () => ({
    type: actions.next_game,
    payload: '',
});

export const move = dir => ({
    type: actions.move,
    payload: dir,
});

export const moveEnded = () => ({
    type: actions.moveEnded,
    payload: '',
});
