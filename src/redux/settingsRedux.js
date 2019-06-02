import {saveData} from "../utilities/storage";
import {copyAndSet} from "./utilRedux";

const actions = {
    toggle_setting: 'TOGGLE_SETTING',
    set_setting: 'SET_SETTING',
};

const options = {
    theme : ['Minimalistic', 'Car' , 'Wood'],
    highlight : ['Enabled', 'Disabled'],
};

export const initialState = {
    theme: options['theme'][1],
    highlight: options['highlight'][0],
    carSpeed: '2.5',
};

export const settingsReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.toggle_setting: {
            const {key} = action.payload;

            let next = copyAndSet(state, {
                [key] : options[key][(options[key].indexOf(state[key]) + 1) % options[key].length]
            });

            saveData(key, next[key]);

            return next;
        }

        case actions.set_setting : {
            const {key, value} = action.payload;

            let next = copyAndSet(state, {
                [key] : value ? value : state[key]
            });

            saveData(key, next[key]);

            return next;
        }

        default: return state;
    }
};

export const toggleSetting = key => ({
    type: actions.toggle_setting,
    payload: {key: key},
});

export const setSetting = (key, value) => ({
    type: actions.set_setting,
    payload: {key: key, value: value},
});
