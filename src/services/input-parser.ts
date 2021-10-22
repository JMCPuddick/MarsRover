import { Vector2 } from "../core";

export class InputParser {
    /**
     * This will likely be a VERY flaky part of the program, additiona validation would be needed
     * @param input string input to turn into a vector2 coordinate
     */
    static ToVector2(input:string) {
        //input in format x, y
        const parsedInput: String[] = input.split(' ');

        let newX: number = +parsedInput[0];
        let newY: number = +parsedInput[1];

        return new Vector2(newX, newY);
    }

    //In this case, I have decided we will simply omit any invalid commands
    static ProcessLine(inputLine: String) {
        const commandArray = inputLine.split('');
        var validCommands:Array<string> = [];

        commandArray.forEach(c => {
            if(c === "L" || c === "R" || c === "M") validCommands.push(c);
        });

        return validCommands;
    }

    static SplitLines(inputBody: string) {
        return inputBody.split(/\r?\n/);
    }
}