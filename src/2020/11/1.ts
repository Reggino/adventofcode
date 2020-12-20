import { readFileSync } from "fs";
import { join } from "path";

let seats = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => line.split("") as Array<"L" | "#" | ".">);

function getNewSeatState(rowIndex: number, colIndex: number): "L" | "#" | "." {
  const seat = seats[rowIndex][colIndex];
  if (seat === ".") {
    return ".";
  }
  const adjacentOccupiedCount = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ].filter(delta => {
    const [dRow, dCol] = delta;
    const row = seats[rowIndex + dRow];
    return row ? row[colIndex + dCol] === "#" : false;
  }).length;

  if (adjacentOccupiedCount === 0) {
    return "#";
  }
  if (seat === "#" && adjacentOccupiedCount >= 4) {
    return "L";
  }
  return seat;
}

for (let i = 0; i < 100; i++) {
  const newSeats = [[]] as Array<Array<"L" | "#" | ".">>;
  for (let rowIndex = 0; rowIndex < seats.length; rowIndex++) {
    newSeats[rowIndex] = [];
    for (let colIndex = 0; colIndex < seats[rowIndex].length; colIndex++) {
      newSeats[rowIndex][colIndex] = getNewSeatState(rowIndex, colIndex);
    }
  }
  seats = newSeats;
}

console.log(
  seats.reduce((prev, row) => prev + row.filter(seat => seat === "#").length, 0)
);
