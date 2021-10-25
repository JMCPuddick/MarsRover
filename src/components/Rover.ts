import { Bearing, Navigator } from '../core';
import { Vector2 } from '../core/Vector2';
import { InputParser } from '../services';

export class Rover {
    bounds:Vector2 = new Vector2(2, 2); //default to a 2x2 grid we can move in. TODO -- could use state or global const trackers to share the gridsize if we want that.
    
    position:Vector2 = new Vector2(0, 0);

    bearing:string = Bearing.N; //Default to face north;

    navigator: Navigator;

    constructor(bounds: Vector2, position: Vector2, bearing: string) {
        this.bounds = bounds;
        this.position = position;
        this.bearing = bearing;
        this.navigator = new Navigator(position, bearing, bounds);
    }

    UpdatePosition() {
        this.position = this.navigator.currentPosition;
    }

    UpdateBearing() {
        this.bearing = this.navigator.currentBearing;
    }

    ShowLocation() {
        console.log(`${this.position.x} ${this.position.y} ${this.bearing}`);
    }
}