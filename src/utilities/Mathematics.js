// @flow

export function round(n : number, digits : number = 2) : number {
    if (!n) return 0;
    return Math.floor(n * (10 ** digits)) / (10 ** digits);
}

// Generates random number between lower (inclusive) and upper (exclusive)
export function random(lower : number, upper : number) : number {
    return Math.floor(Math.random() * (upper - lower)) + lower;
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

    mul(scale : number) : Vec2 {
        return new Vec2(this.x * scale, this.y * scale);
    }

    clamp() : Vec2 {
        return new Vec2(Math.min(Math.max(this.x, -1), 1), Math.min(Math.max(this.y, -1), 1));
    }

    equals(other : Vec2) : boolean {
        return Math.abs(this.x - other.x) < 0.01 && Math.abs(this.y - other.y) < 0.01;
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
