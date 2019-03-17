// @flow

import {Vec2, Grid, random} from "../utilities/Mathematics";

export type Square = "Empty" | "Wall" | "Finish";
export type Move = "Left" | "Up" | "Right" | "Down";
export type Game = {
    grid: Grid<Square>;
    player: Vec2;
    start: Vec2;
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

    while(grid.inside(pos.add(dir)) && !isSolid[grid.at(pos.add(dir))]){
        pos = pos.add(dir);
    }

    return {grid : grid, player : pos, start : start};
}

export function resetGame(game : Game) : Game {
    return {grid : game.grid, player : game.start, start: game.start};
}

export function gameEnded(game : Game) : boolean {
    return game.grid.at(game.player) === "Finish";
}

export function generateGame() : Game {
    let ratio = random(1, 5);
    let width = ratio * 5;
    let height = ratio * 5;

    let grid = new Grid<Square>(height, width, "Empty");
    let seen = new Grid<boolean>(height, width, false);
    let path = new Grid<boolean>(height, width, false);

    let current = new Vec2(0, 0);

    while(true) {
        let options = [];
        for(let prop in dirs){
            let dir = dirs[prop];
            let pos = current.add(dir);

            while(grid.inside(pos) && !isSolid[grid.at(pos)]) {
                if(!seen.at(pos) && (!grid.inside(pos.add(dir)) || !path.at(pos.add(dir)))){
                    options.push(pos);
                }
                pos = pos.add(dir);
            }
        }

        if(options.length === 0) break;

        let next_pos = options[random(0, options.length)];
        let next_dir = next_pos.sub(current).clamp();

        if(grid.inside(next_pos.add(next_dir))){
            grid.set(next_pos.add(next_dir), "Wall");
        }

        for(let pos = current; pos.x !== next_pos.x || pos.y !== next_pos.y; pos = pos.add(next_dir)){
            path.set(pos, true);
        }

        for(let prop in dirs){
            let dir = dirs[prop];
            let pos = current;

            while(grid.inside(pos) && !isSolid[grid.at(pos)]) {
                seen.set(pos, true);
                pos = pos.add(dir);
            }
        }

        current = next_pos;
    }

    grid.set(current, "Finish");

    return { grid : grid, player : new Vec2(0, 0), start : new Vec2(0,0) };
}

const dirs = {Left: new Vec2(-1, 0), Right: new Vec2(1, 0), Up: new Vec2(0, -1), Down: new Vec2(0, 1)};
