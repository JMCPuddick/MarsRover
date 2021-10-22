import { Vector2 } from "../core";

export class InputParser {
    AsVector2(input:string) {
        //input in format x, y
        const parsedInput: String[] = input.split(' ');

        try {
            let newX: number = +parsedInput[0];
            let newY: number = +parsedInput[1];

            return new Vector2(newX, newY);
        } catch {
            console.log(`Unable to parse string commands into a number, did you make sure to type a number?: input: ${parsedInput}`);

            return false;
        }
    }
}