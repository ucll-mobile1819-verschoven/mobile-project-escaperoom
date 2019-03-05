// @flow

import * as math from "../utilities/mathematics.js";

export type Square = "Empty" | "Wall" | "Finish";
export type Move = "Left" | "Up" | "Right" | "Down";
export type Field = {
    grid: math.Grid<Square>;
    player: math.Vec2;
};

let isSolid = {
    Empty: false,
    Wall: true,
    Finish: false,
};

export function advanceField(field : Field, move : Move) : void {
    field.player = slide(field.grid, field.player, dirs[move]);
}

export function generateField() : Field {
    let width = math.random(5, 25);
    let height = math.random(width, 25);

    let grid = new math.Grid<Square>(height, width, "Empty");
    let seen = new math.Grid<boolean>(height, width, false);
    let path = new math.Grid<boolean>(height, width, false);

    let current = new math.Vec2(0, 0);

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

        let next_pos = options[math.random(0, options.length)];
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

    return { grid : grid, player : new math.Vec2(0, 0) };
}

function slide(grid : math.Grid<Square>, pos : math.Vec2, dir : math.Vec2) : math.Vec2 {
    while(grid.inside(pos.add(dir)) && !isSolid[grid.at(pos.add(dir))]){
        pos = pos.add(dir);
    }
    return pos;
}

const dirs = {Left: new math.Vec2(-1, 0), Right: new math.Vec2(1, 0), Up: new math.Vec2(0, -1), Down: new math.Vec2(0, 1)};
