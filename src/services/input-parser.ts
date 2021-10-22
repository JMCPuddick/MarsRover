import { Bearing, Vector2 } from "../core";

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

    static Vector2FromStrings(x: string, y: string) {
        return new Vector2(+x, +y);
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

    static GetCoordinates(input: string) {
        let xyb = input.split(' ');
        return this.Vector2FromStrings(xyb[0], xyb[1]);
    }

    static GetBearingFromCommand(input: string) {
        let xyb = input.split(' ');
        return this.ParseBearingFromString(xyb[2]);
    }

    /**
     * A bit of a fudge, didn't have time to go back and fix up enum limitations with something better so used this to tie a loose end.
     * @param bNum number of rotational index.
     */
    static GetBearingFromIndex(bNum: number) {
        switch(bNum) {
            case 0: {
                return Bearing.N;
            }
            case 1: {
                return Bearing.E;
            }
            case 2: {
                return Bearing.S;
            }
            case 3: {
                return Bearing.W;
            }
            default: {
                return Bearing.N;
            }
        }
    }

    static ParseBearingFromString(point: string) {
        switch (point) {
            case "N": {
                return Bearing.N;
            }
            case "E": {
                return Bearing.E;
            }
            case "S": {
                return Bearing.S;
            }
            case "W": {
                return Bearing.W;
            }
            default: {
                return Bearing.N;
            } 
        }
    }

    static SplitLines(inputBody: string) {
        return inputBody.split(/\r?\n/);
    }
}