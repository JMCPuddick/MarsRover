import { Vector2 } from "../core";

/**
 * Currently this service will only check if the tile is within bounds.
 */
export const isValid = (newPosition:Vector2, gridSize:Vector2) => {
    // Returns whether we have a valid move or not before processing.
    if(newPosition.x < 0 || newPosition.x > gridSize.x) return false;
    if(newPosition.y < 0 || newPosition.y > gridSize.y) return false;
    return true;
}