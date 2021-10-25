import { readFileSync } from "fs";
import { Bearing, Vector2 } from "../core";
import { InputParser } from "../services";
import { Navigator } from "./Navigator";

const Dummyinput = readFileSync('./src/tests/DummyInput.txt', 'utf8');

describe('Navigator', () => {
    let mockNavigator: Navigator;
    let mockPosition: Vector2;
    let mockGridSize: Vector2;
    let mockBearing: string;
    
    // Arrange
    beforeAll(() => {
        mockPosition = new Vector2(0, 0);
        mockGridSize = new Vector2(6, 6);
        mockBearing = Bearing.N;
    });

    beforeEach(() => {
        let originalNavigator = new Navigator(mockPosition, mockBearing, mockGridSize);
        mockNavigator = {
            currentPosition: mockPosition,
            currentBearing: mockBearing,
            validArea: mockGridSize,
            moveSpeed: 2,

            ProcessCommandGroup: jest.fn(),
            ProcessCommand: jest.fn(originalNavigator.ProcessCommand),
            Move: jest.fn(originalNavigator.Move),
            Rotate: jest.fn(originalNavigator.Rotate),
            UpdateLocation: jest.fn(),
        }
    })

    it('Can process a line of commands as individual actions and update the position.', () => {
        // Arrange
        let mockCommands = "MMRMLMRRM";
        let mockCommandGroup = InputParser.SplitCommandLines(mockCommands);

        // Act
        mockNavigator.ProcessCommandGroup(mockCommandGroup);

        // Assert
    })

    it('Can process a valid move action', () => {
        // Arrange
        let mockCurrentFacing = Bearing.W;
        let mockMoveSpeed = 2;
        let mockCurrentPosition = new Vector2(3, 3);

        // Act
        let output = mockNavigator.Move(mockMoveSpeed, mockCurrentFacing, mockCurrentPosition);

        // Assert
        expect(output).not.toEqual(mockCurrentPosition);
        // Ensure we have moved 2 spaces to the west (left)
        expect(output).toEqual(new Vector2(mockCurrentPosition.x - 2, mockCurrentPosition.y));
    });

    it('Can process an invalid move action - maintains current position', () => {
        // Arrange
        let mockCurrentFacing = Bearing.E;
        let mockMoveSpeed = 2;
        let mockCurrentPosition = new Vector2(6, 6);

        // Act
        let output = mockNavigator.Move(mockMoveSpeed, mockCurrentFacing, mockCurrentPosition);

        // Assert
        expect(output).toEqual(mockCurrentPosition);
    });

    it('Can process a valid rotate action', () => {
        // Arrange
        let mockCurrentFacing = Bearing.E;
        let mockTurnCommand = "R";

        // Act
        let output = mockNavigator.Rotate(mockTurnCommand, mockCurrentFacing);

        // Assert
        expect(output).not.toEqual(mockCurrentFacing);
        expect(output).toEqual(Bearing.S);
    });

    it('Can process an invalid rotate action - returns original bearing', () => {
        // Arrange
        let mockCurrentFacing = Bearing.E;
        let mockTurnCommand = "F";

        // Act
        let output = mockNavigator.Rotate(mockTurnCommand, mockCurrentFacing);

        // Assert
        expect(output).toEqual(Bearing.E);
    });
});