// input parser
//Should process a line of commands
import { assert } from 'console';
import { readFileSync } from 'fs';
import { InputParser } from '.';
import { Bearing } from '../core';

const Dummyinput = readFileSync('./src/tests/DummyInput.txt', 'utf8');
let commandLine: string;

describe('Input Parser', () => {
    // Arrange
    beforeEach(() => {
        
    })

    it('Can process valid a command line to return a collection of valid commands', () => {
        // Arrange
        commandLine = "LMRMMRML"
        
        // Act
        let output = InputParser.ProcessLine(commandLine);

        // Assert
        expect(output).toHaveLength(commandLine.length);
    });

    it('Can process a command line with invalid commands and return a collection of only valid commands', () => {
        // Arrange
        commandLine = "LMRGHSML";
        let expectedOut = ["L", "M", "R", "M", "L"];

        // Act
        let output = InputParser.ProcessLine(commandLine);

        // Assert
        expect(output).toEqual(expectedOut);
    });

    it('Can get coordinates from deployment commands - valid command', () => {
        // Arrange
        commandLine = "1 1 E";
        let expectedOut = "E";

        // Act
        let output = InputParser.GetBearingFromCommand(commandLine);

        //Assert
        expect(output).toEqual(expectedOut);
    });

    it('Defaults to North if unable to get new bearing form command - invalid command', () => {
        commandLine = "F F";

        // Act
        let output = InputParser.GetBearingFromCommand(commandLine);

        // Assert
        expect(output).toEqual(Bearing.N);
    });
});