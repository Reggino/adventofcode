import { readFileSync } from "fs";
import { join } from "path";
import { sum } from "lodash";

const values = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => Math.floor(parseInt(line, 10)));

const groups = values.reduce<number[][]>(
  (prev, value) => {
    if (isNaN(value)) {
      prev.push([]);
      return prev;
    }
    prev[prev.length - 1].push(value);
    return prev;
  },
  [[]]
);

const totals = groups
  .map(values => sum(values))
  .sort((a, b) => (a < b ? 1 : -1));

console.log(totals[0]);
console.log(totals[0] + totals[1] + totals[2]);
