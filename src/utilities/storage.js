// @flow

import { AsyncStorage } from "react-native"

export function saveData(key: string, value: string) {
    AsyncStorage.setItem(key, value);
}

export function mergeData(key: string, value: string) {
    AsyncStorage.mergeItem(key, value);
}

export function deleteStorageData(keys) {
    AsyncStorage.multiRemove(keys);
}
