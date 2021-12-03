import { readFileSync } from "fs";
import { join } from "path";

const bitRows = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => line.split("").map(bit => parseInt(bit, 10)));

const summedBitRow = bitRows
  .reduce(
    (prev, bitRow) => {
      bitRow.forEach((bit, key) => {
        prev[key] += bit;
      });
      return prev;
    },
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  )
  .map(bitRowCount => (bitRowCount > bitRows.length / 2 ? 1 : 0));

const gammaRate = parseInt(summedBitRow.join(""), 2);
const epsilonRate = parseInt(
  summedBitRow.map(bit => (bit ? 0 : 1)).join(""),
  2
);

console.log(`${gammaRate} * ${epsilonRate} = ${gammaRate * epsilonRate}`);
