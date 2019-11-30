import { readFileSync } from "fs";
import * as path from "path";

interface ICoord {
  x: number;
  y: number;
}

function getDistance(a: ICoord, b: ICoord): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

let coords = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => {
    const splitLine = line.split(", ");
    return {
      x: parseInt(splitLine[0], 10),
      y: parseInt(splitLine[1], 10)
    };
  });

const grid = new Array(400)
  .fill("")
  .map(() => new Array(400).fill("").map(() => -1));

grid.forEach((row, rowKey) => {
  row.forEach((cell, columnKey) => {
    const distances = [];
    coords.forEach((coord, key) => {
      distances.push(getDistance(coord, { x: columnKey, y: rowKey }));
    });
    const shortestDistance = Math.min(...distances);
    const firstCoordIndex = distances.findIndex(
      value => value === shortestDistance
    );
    distances[firstCoordIndex] = 999;
    const secondCoordIndex = distances.findIndex(
      value => value === shortestDistance
    );
    if (secondCoordIndex >= 0) {
      row[columnKey] = -1;
    }
    row[columnKey] = firstCoordIndex;
  });
});

const firstRowValues = grid[0];
const lastRowValues = grid[399];
const firstColValues = grid.map(row => row[0]);
const lastColValues = grid.map(row => row[399]);
const uniqueValues = [
  ...firstRowValues,
  ...lastRowValues,
  ...firstColValues,
  ...lastColValues
].filter((v, i, a) => a.indexOf(v) === i);

console.log("Infinite coord keys:", uniqueValues);

coords.forEach((coord, coordKey) => {
  if (uniqueValues.indexOf(coordKey) >= 0) {
    console.log("Skipping ", coordKey);
    return;
  }
  let coordCount = 0;
  grid.forEach((row, rowKey) => {
    row.forEach((cell, columnKey) => {
      if (cell === coordKey) {
        coordCount++;
      }
    });
  });
  console.log("Got ", coordKey, coordCount);
});
