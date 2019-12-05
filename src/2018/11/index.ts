const serialNumber = 7403;

function getFuelCellPower(x: number, y: number) {
  const rackId = x + 10;
  const powerLevel = (rackId * y + serialNumber) * rackId;
  if (powerLevel < 100) {
    return -5;
  }
  return (
    parseInt(`${Math.floor(powerLevel / 100)}`.split("").pop() as string, 10) -
    5
  );
}

function getGridPower(x: number, y: number) {
  let gridPower = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gridPower += getFuelCellPower(x + i, y + j);
    }
  }
  return gridPower;
}

let maxPower = 0;
let maxPowerX = 0;
let maxPowerY = 0;

for (let x = 1; x < 298; x++) {
  for (let y = 1; y < 298; y++) {
    const power = getGridPower(x, y);
    if (power > maxPower) {
      maxPower = power;
      maxPowerX = x;
      maxPowerY = y;
    }
  }
}

console.log(maxPowerX, maxPowerY, maxPower);
