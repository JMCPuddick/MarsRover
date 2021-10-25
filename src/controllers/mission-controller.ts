import { Bearing, Rover, Vector2 } from "../core";
import { InputParser } from "../services";

/**
 * This class holds a collection of rover objects, and some metadata on the mission (number of rovers total, grid size, stuff like that)
 */
export class MissionController {
    missionSize: Vector2;

    rovers: Array<Rover> = [];

    constructor(missionSize: Vector2) {
        this.missionSize = missionSize;
    }

    /**
     * 
     * @param position Deploy a rover at a location and add to fleet collection
     * @param bearing 
     */
    DeployRover(position: Vector2, bearing: string) {
        let newRover = new Rover(this.missionSize, position, bearing);
        this.rovers.push(newRover);
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
                // Add a new rover to the fleet collection here and init with a position
                //odd number, a coordinate command, land a rover
                let deployPosition = InputParser.GetCoordinates(commands[i]);
                let deployRotation = InputParser.GetBearingFromCommand(commands[i]);
                this.DeployRover(deployPosition, deployRotation);
            } else {
                //An even number, process the movement commands
                //First we split up the commands into an array of single actions
                let splitCommands: string[] = commands[i].split(''); 
                //Then we run these commands in a loop on the navigator.
                this.rovers[roverIndex].navigator.ProcessCommandGroup(splitCommands);
            
                this.rovers[roverIndex].UpdatePosition();
                this.rovers[roverIndex].UpdateBearing();

                this.rovers[roverIndex].ShowLocation();

                //increment to the next rover every 2 command sets
                roverIndex++;
            }
        }
    }
}