import { readFileSync } from "fs";
import { join } from "path";

type TBitRow = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

const bitRows = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => line.split("").map(bit => parseInt(bit, 10))) as TBitRow[];

const getSummedBitRow = (bitRows: TBitRow[]) =>
  bitRows
    .reduce(
      (prev, bitRow) => {
        bitRow.forEach((bit, key) => {
          prev[key] += bit;
        });
        return prev;
      },
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    )
    .map(bitRowCount => (bitRowCount >= bitRows.length / 2 ? 1 : 0));

const summedBitRow = getSummedBitRow(bitRows);
const gammaRate = parseInt(summedBitRow.join(""), 2);
const epsilonRate = parseInt(
  summedBitRow.map(bit => (bit ? 0 : 1)).join(""),
  2
);

console.log(`${gammaRate} * ${epsilonRate} = ${gammaRate * epsilonRate}`);

let filteredBitRows = [...bitRows];
let summedFilteredBitRow = summedBitRow;
let oxygenGeneratorRating = 0;

summedBitRow.some((_summedBit, key) => {
  filteredBitRows = filteredBitRows.filter(
    bitRow => bitRow[key] === summedFilteredBitRow[key]
  );
  console.log(`${filteredBitRows.length} rows left for oxygenGeneratorRating`);
  if (filteredBitRows.length === 1) {
    oxygenGeneratorRating = parseInt(filteredBitRows[0].join(""), 2);
    return true;
  }
  summedFilteredBitRow = getSummedBitRow(filteredBitRows);
  return false;
});

filteredBitRows = [...bitRows];
summedFilteredBitRow = summedBitRow;
let co2ScrubberRating = 0;

summedBitRow.some((_summedBit, key) => {
  filteredBitRows = filteredBitRows.filter(
    bitRow => bitRow[key] !== summedFilteredBitRow[key]
  );
  console.log(`${filteredBitRows.length} rows left for co2ScrubberRating`);
  if (filteredBitRows.length === 1) {
    co2ScrubberRating = parseInt(filteredBitRows[0].join(""), 2);
    return true;
  }
  summedFilteredBitRow = getSummedBitRow(filteredBitRows);
  return false;
});

console.log(
  `${oxygenGeneratorRating} * ${co2ScrubberRating} = ${oxygenGeneratorRating *
    co2ScrubberRating}`
);
