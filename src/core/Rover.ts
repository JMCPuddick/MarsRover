export class Rover {
    Move(amount: number, bearing: Bearing) {
        console.log(`Moving by ${amount} with bearing ${bearing}`)
    }
}

interface Bearing {
    N: string,
    S: string,
    E: string,
    W: string,
}

