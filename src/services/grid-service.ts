export class Plateau {
    constructor(public width: number, public height: number) {}
}

enum TileStates {
    Empty,
    Occupied,
}

export class PlateauManager {
    static create(grid: Plateau) {
        return new Plateau(grid.width, grid.height);
    }
}