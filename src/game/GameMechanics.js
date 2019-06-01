// @flow

import {Vec2, Grid} from "../utilities/Mathematics";

const dirs = {Left: new Vec2(-1, 0), Right: new Vec2(1, 0), Up: new Vec2(0, -1), Down: new Vec2(0, 1)};

export type Square = "Empty" | "Wall" | "Finish" | "LeftArrow" | "RightArrow" | "UpArrow" | "DownArrow";
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
    LeftArrow: false,
    RightArrow: false,
    UpArrow: false,
    DownArrow: false,
};

let isArrow = {
    Empty: false,
    Wall: false,
    Finish: false,
    LeftArrow: true,
    RightArrow: true,
    UpArrow: true,
    DownArrow: true,
};

let arrowToMove = {
    LeftArrow: "Left",
    RightArrow: "Right",
    UpArrow: "Up",
    DownArrow: "Down",
};

export function movePlayer(game : Game, move : Move, moveCost : number = 1) : Game {
    const grid = game.grid;
    const dir = dirs[move];
    const start = game.start;
    let pos = game.player;
    let moved = 0;

    while(grid.inside(pos.add(dir)) && !isSolid[grid.at(pos.add(dir))]){
        pos = pos.add(dir);
        moved = moveCost;
        if(isArrow[grid.at(pos)]) break;
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

export function isChainMove(game : Game) : boolean {
    return isArrow[game.grid.at(game.player)];
}

export function chainMove(game : Game) : Game {
    return movePlayer(game, arrowToMove[game.grid.at(game.player)], 0);
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

function char_to_square(char) : Square {
    switch (char) {
        case 'W': return "Wall";
        case 'F': return "Finish";
        case 'S': return "Empty";
        case '.': return "Empty";
        case '<': return "LeftArrow";
        case '^': return "UpArrow";
        case '>': return "RightArrow";
        case 'v': return "DownArrow";
    }
}
