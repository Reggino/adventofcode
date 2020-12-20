import { readFileSync } from "fs";
import { join } from "path";

const numbers: number[] = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => parseInt(line, 10))
  .sort((a, b) => (a < b ? -1 : 1));

const diffs: { [diff: number]: number } = { 1: 0, 2: 0, 3: 1 }; // 1 is for the default +3 output

numbers.forEach((number, index) => {
  diffs[number - (numbers[index - 1] || 0)] += 1;
});
// @ts-ignore
console.log(diffs, diffs["1"] * diffs["3"]);
