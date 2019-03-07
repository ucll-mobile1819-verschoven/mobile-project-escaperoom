// @flow

import { AsyncStorage } from "react-native"

const options = {
    theme : ['minimalistic', 'car'],
    highlight : ['enabled', 'disabled'],
};

export let settings = {
    theme : options.theme[0],
    highlight : options.highlight[0],
};

export const setSetting = (key : string, value : string) => {
    settings[key] = value;
    return AsyncStorage.setItem(key, value);
};

export const cycleSetting = (key : string) => {
    let index = options[key].indexOf(settings[key]);
    let value = options[key][(index + 1) % options[key].length];
    return setSetting(key, value);
};

export const loadSettings = () => {
    return Promise.all(
        Object.keys(settings).reduce((promises, key) => {
            promises.push(AsyncStorage.getItem(key).then(result => result !== null && (settings[key] = result)));
            return promises;
        }, [])
    );
};
