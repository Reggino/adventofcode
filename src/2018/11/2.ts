const MAX_GRID_SIZE = 300;
const SERIAL_NUMBER = 7403;

const fuelCells: { [key: string]: number } = {};

// setup fuelCells value...
for (let x = 1; x < MAX_GRID_SIZE; x++) {
  for (let y = 1; y < MAX_GRID_SIZE; y++) {
    const rackId = x + 10;
    const powerLevel = (rackId * y + SERIAL_NUMBER) * rackId;
    if (powerLevel < 100) {
      fuelCells[`${x}_${y}`] = -5;
      continue;
    }
    fuelCells[`${x}_${y}`] =
      parseInt(
        `${Math.floor(powerLevel / 100)}`.split("").pop() as string,
        10
      ) - 5;
  }
}

function getGridPower(x: number, y: number, gridSize: number) {
  if (x + gridSize > MAX_GRID_SIZE || y + gridSize > MAX_GRID_SIZE) {
    return 0;
  }

  let gridPower = 0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      gridPower += fuelCells[`${x + i}_${y + j}`];
    }
  }
  return gridPower;
}

let maxPower = 0;
let maxPowerX = 0;
let maxPowerY = 0;
let maxGridSize = 0;

for (let x = 1; x < MAX_GRID_SIZE; x++) {
  console.log(x);
  for (let y = 1; y < MAX_GRID_SIZE; y++) {
    for (let gridSize = 1; gridSize < MAX_GRID_SIZE; gridSize++) {
      const power = getGridPower(x, y, gridSize);
      if (power > maxPower) {
        maxPower = power;
        maxPowerX = x;
        maxPowerY = y;
        maxGridSize = gridSize;
      }
    }
  }
}

console.log(maxPowerX, maxPowerY, maxGridSize, maxPower);
