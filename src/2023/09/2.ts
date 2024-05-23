import { readFileSync } from "fs";
import { join } from "path";
import { sum } from "lodash";

const lines = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8",
})
  .trim()
  .split("\n");

const numberss = lines.map((line) =>
  line.split(" ").map((number) => parseInt(number)),
);

const pyramids = numberss.map((numbers) => {
  let lastRow = numbers;
  const rows = [lastRow];

  while (lastRow.findIndex((number) => number !== 0) !== -1) {
    const newRow = [];
    for (let i = 1; i < lastRow.length; i++) {
      newRow.push(lastRow[i] - lastRow[i - 1]);
    }
    rows.push(newRow);
    lastRow = newRow;
  }
  return rows;
});

const calcNextValue = (pyramid: number[][]): number => {
  for (let rowIndex = pyramid.length - 1; rowIndex > 0; rowIndex--) {
    const sourceRow = pyramid[rowIndex];
    const incrementValue = sourceRow[0];
    const targetRow = pyramid[rowIndex - 1];
    const targetValue = targetRow[0];
    targetRow.unshift(targetValue - incrementValue);
  }
  return pyramid[0][0];
};

// 101 = too low
1708206096;
// 1708206166 = too high
console.log(sum(pyramids.map(calcNextValue)));
