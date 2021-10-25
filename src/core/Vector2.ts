export class Vector2 {
    x: number = 0;
    y: number = 0;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
}

export function Vector2FromStrings(x: string, y: string) {
    return new Vector2(+x, +y);
}