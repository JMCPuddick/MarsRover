import { MissionController } from './controllers';
import { Bearing, Vector2 } from './core';
import { InputParser, PlateauManager } from './services';
import { readFileSync } from 'fs';

const input = readFileSync('./src/input.txt', 'utf8');

let MartianPlateau;
let missionController: MissionController;
let commandsArray = InputParser.SplitCommandLines(input);

const Awake = () => {
    // Initialisation Code
    missionController = new MissionController(InputParser.CoordinateToVector2(commandsArray[0]));
    const plateauSize: Vector2 = InputParser.CoordinateToVector2(commandsArray[0]);

    if(plateauSize) {
        MartianPlateau = PlateauManager.create(plateauSize);
    } else {
        console.log('Unable to create a martian plateau from the given input, please ensure it is in the format [x y]. e.g. 5 5');
    }

    //Run the mission on Mars!
    missionController.RunMission(commandsArray);
}

Awake();