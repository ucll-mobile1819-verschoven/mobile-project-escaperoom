// @flow

export const levelData = require('../../assets/levels/levels.json');

const baseDifficulty = 2;

export function idToLevel(id) {
    let [version, difficulty, nr] = id.split("-");
    if (version !== levelData.version) return null;

    return levelData.levels[difficulty - baseDifficulty]["Level " + nr];
}

export function levelToId(difficulty, nr) {
    return levelData.version + "-" + difficulty + "-" + nr;
}

// ! Assumes existing difficulties are contiguous starting from 2
export function nextLevelId(id) {
    let [version, difficulty, nr] = id.split("-");
    if (version !== levelData.version) return null;

    nr++;
    if(levelData.levels[difficulty - baseDifficulty]["Level " + nr]) return levelToId(difficulty, nr);
    difficulty++;
    nr = 1;
    if(levelData.levels[difficulty - baseDifficulty]) return levelToId(difficulty, nr);
    difficulty = baseDifficulty;
    return levelToId(difficulty, nr);
}

export function idToDifficulty(id) {
    return parseInt(id.split("-")[1]);
}
