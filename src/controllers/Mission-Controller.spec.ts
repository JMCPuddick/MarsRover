import { readFileSync } from "fs";
import { MissionController } from ".";
import { Vector2 } from "../core";
import { InputParser } from "../services";

const Dummyinput = readFileSync('./src/tests/DummyInput.txt', 'utf8');

describe('Mission Controller', () => {
    // Arrange
    let mockMissionSize: Vector2 = new Vector2(5, 5);
    let mockFleetSize = 3;
    let missionCommands = InputParser.SplitCommandLines(Dummyinput);
    let mockController: MissionController;

    it('Can start a new mission with given grid size', () => {
        // Act
        mockController = new MissionController(mockMissionSize);

        // Assert
        expect(mockController.missionSize).toMatchObject(mockMissionSize);
    });

    it('will run a successful mission given a page of commands', () => {
        // Arrange
        let expectedPosition = new Vector2(1, 3);
        
        // Act
        mockController.RunMission(missionCommands);

        //Assert
        // MMRMLM should be test input for rover[0] should get it to [3,1]
        expect(mockController.rovers[0].position).toEqual(expectedPosition);
    });
});