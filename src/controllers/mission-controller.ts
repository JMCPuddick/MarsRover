import { Bearing, Rover, Vector2 } from "../core";
import { InputParser } from "../services";

/**
 * This class holds a collection of rover objects, and some metadata on the mission (number of rovers total, grid size, stuff like that)
 */
export class MissionController {
    fleetSize: number = 5; //We will have 5 robots
    missionSize: Vector2;

    rovers: Array<Rover> = [];

    constructor(missionSize: Vector2) {
        this.missionSize = missionSize;

        //Create the fleet!
        for (let i = 0; i < this.fleetSize; i++) {
            let rover = new Rover(missionSize, new Vector2(0, 0), Bearing.N);
            this.rovers.push(rover);            
        }
    }

    /**
     * Run a mission, go over the commands line by line and work out what they mean.
     * @param commands a whole array of individual lines to go over and process.
     */
    RunMission(commands: string[]) {
        let roverIndex = 0;
        for (let i = 1; i < commands.length; i++) {
            //first deploy
            if(i % 2 === 1) {
                //odd number, a coordinate command, land a rover
                this.rovers[roverIndex].position = InputParser.GetCoordinates(commands[i]);
                this.rovers[roverIndex].bearing = InputParser.GetBearingFromCommand(commands[i]);
            } else {
                //An even number, process the movement commands

                //First we split up the commands into an array of single actions
                let splitCommands: string[] = commands[i].split(''); 

                //Then we run these commands in a loop on the navigator.
                this.rovers[roverIndex].navigator.ProcessCommandGroup(splitCommands);
            
                this.rovers[roverIndex].ShowLocation();

                //increment to the next rover every 2 command sets
                roverIndex++;
            }
        }
    }
}