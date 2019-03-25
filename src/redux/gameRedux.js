import {gameEnded, generateGame, movePlayer, resetGame} from "../game/GameMechanics";
import {copyAndSet} from "./utilRedux";

const actions = {
    reset_game: 'RESET_GAME',
    next_game: 'NEXT_GAME',
    move: 'MOVE',
    moveEnded: 'MOVE_ENDED',
    check_game: 'CHECK_GAME',
};

const initialState = {
    gameData: generateGame(),
    moving: false,
    moveDir: 'Up',
    isGameFinished : false,
    moveCounter : 0,
};

export const gameReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.reset_game:    return copyAndSet(state, {moving: false, gameData: resetGame(state.gameData), isGameFinished : false});
        case actions.next_game:     return copyAndSet(state, {moving: false, gameData: generateGame() , isGameFinished : false , moveCounter: 0});
        case actions.move:          return copyAndSet(state, {
            moving: true,
            moveDir: state.moving ? state.moveDir : action.payload,
            gameData: state.moving ? state.gameData : movePlayer(state.gameData, action.payload),
            moveCounter: state.moveCounter + (state.moving ? 0 : 1),
            isGameFinished : false
        });
        case actions.moveEnded:     return copyAndSet(state, {moving: false,  isGameFinished : gameEnded(state.gameData) });

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
