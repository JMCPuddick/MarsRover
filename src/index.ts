import { MissionController } from './controllers';
import { Bearing, Vector2 } from './core';
import { InputParser, PlateauManager } from './services';
import { readFile, readFileSync } from 'fs';

const input = readFileSync('./src/input.txt', 'utf8');

let gridSizeInput: string = "5 5"; // This will be read from the input.txt, but I ran out of time.
let MartianPlateau;
let missionController: MissionController = new MissionController(InputParser.ToVector2(gridSizeInput));
let commandsArray = InputParser.SplitLines(input);

const Awake = () => {
    // Initialisation Code
    const plateauSize: Vector2 = InputParser.ToVector2(gridSizeInput);

    if(plateauSize) {
        MartianPlateau = PlateauManager.create(plateauSize);
    } else {
        console.log('Unable to create a martian plateau from the given input, please ensure it is in the format [x y]. e.g. 5 5')
    }
}

Awake();

missionController.RunMission(commandsArray);