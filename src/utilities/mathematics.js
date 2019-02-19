// @flow

export function round(n : number, digits : number = 2) {
    if (!n) {
        return 0;
    }

    return Math.floor(n * (10 ** digits)) / (10 ** digits);
}

export class Vec2 {
    x: number;
    y: number;
}
