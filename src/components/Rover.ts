import { Bearing, Navigator } from '../core';
import { Vector2 } from '../core/Vector2';

export class Rover {
    bounds:Vector2 = new Vector2(2, 2); //default to a 2x2 grid we can move in. TODO -- could use state or global const trackers to share the gridsize if we want that.
    
    position:Vector2 = new Vector2(0, 0);

    bearing:Bearing = Bearing.N; //Default to face north

    navigator: Navigator;

    constructor(bounds: Vector2, position: Vector2, bearing: Bearing) {
        this.bounds = bounds;
        this.position = position;
        this.bearing = bearing;
        this.navigator = new Navigator(position, bearing, bounds);
    }
}