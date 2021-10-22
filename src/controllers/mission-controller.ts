import { Bearing, Rover, Vector2 } from "../core";

/**
 * This class holds a collection of rover objects, and some metadata on the mission (number of rovers total, grid size, stuff like that)
 */
export class MissionController {
    commandList: string = "LRMRMMRL"
    deploymentCommand: string = "0 0 N"
    fleetSize: number = 5; //We will have 5 robots
    missionSize: Vector2;

    rovers: Array<Rover> = [];

    fleetController = {};

    constructor(missionSize: Vector2) {
        this.missionSize = missionSize;

        //Create the fleet!
        for (let i = 0; i < this.fleetSize; i++) {
            let rover = new Rover(missionSize, new Vector2(0, 0), Bearing.N);
            this.rovers.push(rover);            
        }
    }
}