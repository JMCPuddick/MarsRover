console.log('Hello Mars!');

import GridService = require('./services/grid-service');
import inputParser = require('./services/input-parser');

const Awake = () => {
    // Initialisation Code
    const plateau: GridService.Plateau = {
        width: 5,
        height: 5
    }
    const MartianPlateau = GridService.PlateauManager.create(plateau)
}