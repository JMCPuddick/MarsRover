import { Bearing, Vector2, Vector2FromStrings } from "../core";

export class InputParser {
    /**
     * Takes a coordinate string in format "x y" and returns a Vector2 coordinate
     * @param input string input to turn into a vector2 coordinate
     */
    static CoordinateToVector2(input:string) {
        //input in format x, y
        const parsedInput: String[] = input.split(' ');

        let newX: number = +parsedInput[0];
        let newY: number = +parsedInput[1];

        return new Vector2(newX, newY);
    }

    /**
     * //In this case, simply omit any invalid commands
     * @param inputLine A single line of input as string, to be split.
     * @returns a string array of single characters, representing individual move commands
     */
     static ProcessLine(inputLine: String): string[] {
        const commandArray = inputLine.split('');
        var validCommands:Array<string> = [];

        commandArray.forEach(c => {
            if(c === "L" || c === "R" || c === "M") validCommands.push(c);
        });

        return validCommands;
    }

    /**
     * 
     * @param input A string of coordinates in the format "x y"
     * @returns A vector2 representing a coordinate
     */
    static GetCoordinates(input: string): Vector2 {
        let xyb = input.split(' ');
        return Vector2FromStrings(xyb[0], xyb[1]);
    }

    /**
     * Gets a bearing from a line of deployment commands
     * @param input the absolute direction to face, a string of either N, E, S, or W
     * @returns A string representing a compass direction
     */
    static GetBearingFromCommand(input: string) {
            let xyb = input.split(' ');
            //Make sure our command is long enough and it is a valid bearing TODO -- Extract out
            if(xyb.length > 2 && Object.keys(Bearing).includes(xyb[2])) {
                return xyb[2];
            }
            else {
                return Bearing.N; // For now we will default to north if unable to find a new bearing
            } 
    }

    // A bit of a fudge, there is likely a more elegant way of doing this with object literals
    /**
     * Gets a bearing from a rotational index (ie 0 is N, etc.)
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

    /**
     * Gets the whole page of commands, and splits them by new line ready for categorising and processing in turn.
     * @param inputBody The entire input body, usually the input from ReadFileSnc or other input source.
     * @returns An array of individual lines, each represented as a string ready for further parsing.
     */
    static SplitCommandLines(inputBody: string): string[] {
        return inputBody.split(/\r?\n/);
    }
}