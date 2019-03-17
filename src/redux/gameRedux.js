import {generateGame, movePlayer, resetGame} from "../game/GameMechanics";

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
};

export const gameReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.reset_game:    return {moving: false,  moveDir: state.moveDir, gameData: resetGame(state.gameData)};
        case actions.next_game:     return {moving: false,  moveDir: state.moveDir, gameData: generateGame()};
        case actions.move: return {
            moving: true,
            moveDir: state.moving ? state.moveDir : action.payload,
            gameData: state.moving ? state.gameData : movePlayer(state.gameData, action.payload),
        };
        case actions.moveEnded:     return {moving: false,  moveDir: state.moveDir, gameData: state.gameData};

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
