import { isValidMove, PlateauManager } from ".";
import { Vector2, Vector2FromStrings } from "../core";

describe('Pathfinding Service', () => {
    let grid: Vector2;
    let newPosition: Vector2;

    beforeAll(() => {
        grid = new Vector2(5, 5);
    })

    it('isValid move returns true when move is within bounds', () => {
        // Arrange
        newPosition = new Vector2(3, 3);

        // Act
        let output = isValidMove(newPosition, grid);

        // Assert
        expect(output).toBe(true);
    });

    it('isValid move returns false when move is out of bounds', () => {
        // Arrange
        newPosition = new Vector2(12, 8);

        // Act
        let output = isValidMove(newPosition, grid);

        // Assert
        expect(output).toBe(false);
    });
});