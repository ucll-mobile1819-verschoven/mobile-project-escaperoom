// @flow

import { AsyncStorage } from "react-native"

export function saveData(key: string, value: string) {
    AsyncStorage.setItem(key, value);
}
