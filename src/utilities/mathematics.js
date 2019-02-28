// @flow

export function round(n : number, digits : number = 2) : number {
    if (!n) return 0;
    return Math.floor(n * (10 ** digits)) / (10 ** digits);
}

// Generates random number between lower (inclusive) and upper (exclusive)
export function random(lower : number, upper : number) : number {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

export function isSuperSet<T>(set : Set<T>, subset : Set<T>) : boolean {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}

export class Vec2 {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    add(other : Vec2) : Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    sub(other : Vec2) : Vec2 {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    clamp() : Vec2 {
        return new Vec2(Math.min(Math.max(this.x, -1), 1), Math.min(Math.max(this.y, -1), 1));
    }
}

export class Grid<T> {
    _data : Array<Array<T>>;

    constructor(height : number, width: number, value : T) {
        this._data =
            Array(height).fill().map(
                () => Array(width).fill().map(
                    () => value
               )
            ) ;
    }

    width() : number {
        return this._data[0].length;
    }

    height() : number {
        return this._data.length;
    }

    inside(pos : Vec2) : bool {
        return pos.x >= 0 && pos.x < this.width() && pos.y >= 0 && pos.y < this.height();
    }

    at(pos : Vec2) : T {
        if(!this.inside(pos)) throw new Error('Accessing position outside of grid: x:' + pos.x + ', y: ' + pos.y);
        return this._data[pos.y][pos.x];
    }

    set(pos : Vec2, value : T) : void {
        if(!this.inside(pos)) throw new Error('Accessing position outside of grid: x:' + pos.x + ', y: ' + pos.y);
        this._data[pos.y][pos.x] = value;
    }
}
