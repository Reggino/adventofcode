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
    let lookRowIndex = rowIndex + dRow;
    let lookColIndex = colIndex + dCol;
    let row = seats[lookRowIndex];
    if (!row) {
      return false;
    }
    let seat = row[lookColIndex];
    while (seat === ".") {
      lookRowIndex += dRow;
      lookColIndex += dCol;
      row = seats[lookRowIndex];
      if (!row) {
        return false;
      }
      seat = row[lookColIndex];
    }
    return seat === "#";
  }).length;

  if (adjacentOccupiedCount === 0) {
    return "#";
  }
  if (seat === "#" && adjacentOccupiedCount >= 5) {
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
