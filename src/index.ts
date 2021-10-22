console.log('Hello Mars!');

import { Bearing, Vector2 } from './core';
import { InputParser, PlateauManager } from './services';
let gridSizeInput: string = "5 5";
let MartianPlateau;

const Awake = () => {
    // Initialisation Code
    let bearing = Bearing.N;
    const plateauSize: Vector2 | boolean = InputParser.ToVector2(gridSizeInput);

    if(plateauSize) {
        MartianPlateau = PlateauManager.create(plateauSize);
    } else {
        console.log('Unable to create a martian plateau from the given input, please ensure it is in the format [x y]. e.g. 5 5')
    }
}

Awake();