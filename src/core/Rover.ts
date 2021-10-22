import { Bearing } from './';
import { Vector2 } from './Vector2';

export class Rover {
    position:Vector2 = new Vector2(0, 0);
    bearing:Bearing = Bearing.N; //Default to face north

    Move(amount: number, bearing: Bearing) {
        console.log(`Moving by ${amount} with bearing ${bearing}`)
    }
}