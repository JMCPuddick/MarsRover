import { TileStates, Vector2 } from "../core";

export class Plateau {
    constructor(public width: number, public height: number) {}
}

export class PlateauManager {
    static create(grid: Vector2) {
        return new Plateau(grid.x, grid.y);
    }
}