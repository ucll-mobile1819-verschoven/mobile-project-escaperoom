import {deleteStorageData, mergeData} from "../utilities/storage";
import {copy, copyAndSet} from "./utilRedux";

const actions = {
    set_player_data: 'SET_PLAYER_DATA',
    update_highscore: 'UPDATE_HIGHSCORE',
    delete_data: 'DELETE_DATA',
};

export const initialState = {
    highscore : {},
};

export const playerDataReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.set_player_data : {
            const {key, value} = action.payload;

            if (!value) {
                return state;
            }
            else if (key === 'highscore') {
                return copyAndSet(state, {
                    highscore: JSON.parse(value)
                });
            }
            else {
                return state;
            }
        }

        case actions.update_highscore : {
            const {id, score} = action.payload;

            if(state.highscore[id] <= score) return state;

            mergeData('highscore', JSON.stringify({[id] : score}));

            return copyAndSet(state, {
                highscore: copyAndSet(
                    state.highscore, {
                        [id] : score
                    }
                )
            });
        }

        case actions.delete_data : {
            deleteStorageData(Object.keys(initialState));
            return copy(initialState);
        }

        default: return state;
    }
};

export const setPlayerData = (key, value) => ({
    type: actions.set_player_data,
    payload: {key: key, value: value},
});

export const updateHighscore = (id, score) => ({
    type: actions.update_highscore,
    payload: {id: id, score: score},
});
