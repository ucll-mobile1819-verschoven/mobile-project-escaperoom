// @flow

import {Vec2, Grid, random} from "../utilities/Mathematics";

export type Square = "Empty" | "Wall" | "Finish";
export type Move = "Left" | "Up" | "Right" | "Down";
export type Game = {
    grid: Grid<Square>;
    player: Vec2;
    start: Vec2;
    moveDir: Move,
    isGameFinished: boolean,
    moveCounter: number,
};

let isSolid = {
    Empty: false,
    Wall: true,
    Finish: false,
};

export function movePlayer(game : Game, move : Move) : Game {
    const grid = game.grid;
    const dir = dirs[move];
    const start = game.start;
    let pos = game.player;
    let moved = 0;

    while(grid.inside(pos.add(dir)) && !isSolid[grid.at(pos.add(dir))]){
        pos = pos.add(dir);
        moved = 1;
    }

    return {
        grid : grid,
        player : pos,
        start : start,
        moveDir: move,
        isGameFinished: grid.at(pos) === "Finish",
        moveCounter: game.moveCounter + moved
    };
}

export function resetGame(game : Game) : Game {
    return {
        grid : game.grid,
        player : game.start,
        start: game.start,
        moveDir: game.moveDir,
        isGameFinished: false,
        moveCounter: 0
    };
}

export function levelToGame(level) : Game {
    let y = level.findIndex(line => line.includes('S'));
    let x = level[y].indexOf('S');
    let grid = new Grid<Square>(0, 0, "Empty");
    grid._data = level.map(line => line.split('').map(char => char_to_square(char)));

    return {
        grid : grid,
        player : new Vec2(x, y),
        start : new Vec2(x, y),
        moveDir : dirs.Right,
        isGameFinished : false,
        moveCounter : 0,
    };
}

function char_to_square(char) {
    switch (char) {
        case 'W': return "Wall";
        case 'F': return "Finish";
        default: return "Empty";
    }
}

const dirs = {Left: new Vec2(-1, 0), Right: new Vec2(1, 0), Up: new Vec2(0, -1), Down: new Vec2(0, 1)};
