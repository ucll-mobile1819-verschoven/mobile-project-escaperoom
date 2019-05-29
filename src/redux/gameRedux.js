import {gameEnded, generateGame, movePlayer, resetGame, validMove} from "../game/GameMechanics";
import {copyAndSet} from "./utilRedux";

const actions = {
    reset_game: 'RESET_GAME',
    next_game: 'NEXT_GAME',
    move: 'MOVE',
    moveEnded: 'MOVE_ENDED',
    check_game: 'CHECK_GAME',
};

const initialState = {
    moving: false,
    gameData: {} //generateGame(),
};

export const gameReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.reset_game:    return copyAndSet(state, {moving: false, gameData: resetGame(state.gameData)});
        case actions.next_game:     return copyAndSet(state, {moving: false, gameData: generateGame()});
        case actions.move: {
            if(state.moving) return state;

            return copyAndSet(state, {moving: true, gameData: movePlayer(state.gameData, action.payload)});
        }
        case actions.moveEnded:     return copyAndSet(state, {moving: false});

        default: return state;
    }
};

export const gameReset = () => ({
    type: actions.reset_game,
    payload: '',
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
