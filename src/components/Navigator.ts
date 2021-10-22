import { isValidMove } from "../services";
import { Bearing } from "../core/Positional";
import { Vector2 } from "../core/Vector2";

/**
 * Parses navigation commands and gets bearings based on turn commands
 */
export class Navigator {
    currentPosition: Vector2;
    currentBearing: Bearing;
    validArea: Vector2;

    constructor(currentPosition: Vector2, currentBearing: Bearing, validArea: Vector2) {
        this.currentPosition = currentPosition;
        this.currentBearing = currentBearing;
        this.validArea = validArea;
    }

    updateLocation(position: Vector2, bearing: Bearing) {
        this.currentPosition = position;
        this.currentBearing = bearing;
    }

    //M is move forward
    // TODO -- Could make turn commands a more strict type than just string.
    UpdateBearing(turnCommand: string, currentBearing: Bearing) {
        //Gets the current index of the current bearing, for some fun numerical rotation.
        let bearingCounter: number = Object.keys(Bearing).indexOf(currentBearing.toString());
        let newBearing: number = 0;
        
        switch(turnCommand) {
            case "L": {
                //L is spin left 90 degrees, ccw
                newBearing = bearingCounter - 1;
                break;
            }
            case "R": {
                //R is spin right 90 degrees, cw
                newBearing = bearingCounter + 1;
                break;
            }
            default: {
                console.log(`Unable to make sense of the given rotation command ${turnCommand}, it should be either "L" or "R"`);
                break;
            }
        }

        //Reset bounds here, reduces duplication
        if(newBearing < 0) newBearing = 3;
        if(newBearing > 3) newBearing = 0;

        return Bearing[newBearing];
    }

    Move(amount: number, bearing: Bearing, currentPosition: Vector2) {
        console.log(`Moving by ${amount} with bearing ${bearing}`);
        // Bearing in this case simply tells us which direction we are moving 
        // (the rover may be facing another way, but that's okay, we'll only ever ut the same direction as its curent bearing, but we can support sidestepping or reversing this way)
        var tryPosition = new Vector2(currentPosition.x, currentPosition.y);
        
        switch (bearing) {
            case Bearing.N : {
                //North move
                tryPosition.y = currentPosition.y + 1;
                break;
            }
            case Bearing.E : {
                tryPosition.x = currentPosition.x + 1;
                break;
            }
            case Bearing.S : {
                tryPosition.y = currentPosition.y - 1;
                break;
            }
            case Bearing.W : {
                tryPosition.x = currentPosition.x - 1;
                break;
            }
            default : {
                console.log('Malformed move command, unable to determine direction of travel');
            }
        }
        if(isValidMove(tryPosition, this.validArea)) return tryPosition;

        // Failed to move, just return the current position Vector2
        return currentPosition;

    }
}