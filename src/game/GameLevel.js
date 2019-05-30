// @flow

export const levelData = require('../../assets/levels/levels.json');

export function idToLevel(id) {
    let [tab, difficulty, nr] = id.split("#");
    return levelData[tab][difficulty][parseInt(nr)];
}

export function levelToId(tab, difficulty, nr) {
    return tab + "#" + difficulty + "#" + nr;
}

// ! Assumes existing difficulties are contiguous starting from 2
export function nextLevelId(id) {
    const [tab, difficulty, nr] = id.split("#");

    const next_index = parseInt(nr) + 1;
    if(levelData[tab][difficulty][next_index]) return levelToId(tab, difficulty, next_index);

    const tab_keys = Object.keys(levelData[tab]);
    const next_difficulty_index = tab_keys.indexOf(difficulty) + 1;
    if(next_difficulty_index < tab_keys.length) return levelToId(tab, tab_keys[next_difficulty_index], 0);

    const tabs = Object.keys(levelData);
    const next_tab_index = tabs.indexOf(tab) + 1;
    if(next_tab_index < tabs.length) return levelToId(tabs[next_tab_index], Object.keys(levelData[tabs[next_tab_index]])[0], 0);

    return levelToId(tabs[0], Object.keys(levelData[tabs[0]])[0], 0);
}

export function idToDifficulty(id) {
    return parseInt(id.split("#")[1]);
}
