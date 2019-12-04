import { readFileSync } from "fs";
import { join } from "path";

const wiresCommands = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => line.split(","));

interface IPoint {
  x: number;
  y: number;
  wire0Length?: number;
  wire1Length?: number;
}

const grid: IPoint[][] = [];

function plotPoint(
  y: number,
  x: number,
  wireIndex: number,
  wireLength: number
) {
  if (!grid[y]) {
    grid[y] = [];
  }
  if (!grid[y][x]) {
    grid[y][x] = {
      x,
      y
    };
  }
  // process.stdout.write(`${wireIndex}`);
  grid[y][x][`wire${wireIndex}Length` as "wire0Length"] = wireLength;
}

function plotWire(wireIndex: number) {
  let pointerX = 2000;
  let pointerY = 2000;
  let wireLength = 0;

  for (
    let commandIndex = 0;
    commandIndex < wiresCommands[wireIndex].length;
    commandIndex++
  ) {
    const command = wiresCommands[wireIndex][commandIndex];
    const opcode = command.substr(0, 1);
    const opcodeValue = parseInt(command.substr(1), 10);

    switch (opcode) {
      case "R":
        for (let i = 0; i < opcodeValue; i++) {
          plotPoint(pointerY, ++pointerX, wireIndex, ++wireLength);
        }
        break;

      case "D":
        for (let i = 0; i < opcodeValue; i++) {
          plotPoint(++pointerY, pointerX, wireIndex, ++wireLength);
        }
        break;

      case "L":
        for (let i = 0; i < opcodeValue; i++) {
          plotPoint(pointerY, --pointerX, wireIndex, ++wireLength);
        }
        break;

      case "U":
        for (let i = 0; i < opcodeValue; i++) {
          plotPoint(--pointerY, pointerX, wireIndex, ++wireLength);
        }
        break;
    }
  }
}

plotWire(0);
plotWire(1);

// find crossings (x) and calculate distance to center (2000, 2000)
const intersectionPoints: IPoint[] = [];
grid.forEach((row, rowIndex) => {
  row.forEach((col: IPoint, colIndex) => {
    if (col && col.wire0Length && col.wire1Length) {
      intersectionPoints.push(col);
    }
  });
});

console.log(
  `What is the Manhattan distance from the central port to the closest intersection? ${Math.min(
    ...intersectionPoints.map(
      point => Math.abs(point.y - 2000) + Math.abs(point.x - 2000)
    )
  )}`
);

console.log(
  `What is the fewest combined steps the wires must take to reach an intersection? ${Math.min(
    ...intersectionPoints.map(
      point => (point.wire0Length || 0) + (point.wire1Length || 0)
    )
  )}`
);
