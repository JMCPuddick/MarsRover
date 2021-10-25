import { PlateauManager } from ".";
import { Vector2, Vector2FromStrings } from "../core";

describe('Plateau Service', () => {
    it('Can create a plateau of given size {x} by {y}', () => {
        // Arrange
        let width = 8;
        let height = 8;
        let gridSize: Vector2 = new Vector2(width, height);

        // Act
        let plateau = PlateauManager.create(gridSize);

        //Assert
        expect(plateau).toEqual(
            {
                width: width, 
                height: height
            });
    });
});