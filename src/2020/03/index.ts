import { readFileSync } from "fs";
import { join } from "path";

const treeMap = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");
const requiredRowLength = treeMap.length * 3;
const expandedTreeMap = treeMap.map(row => {
  let expandedRow = row;
  while (expandedRow.length < requiredRowLength) {
    expandedRow = `${expandedRow}${row}`;
  }
  return expandedRow;
});

console.log(
  expandedTreeMap.reduce(
    (prev, next, index) => prev + (next[index * 3] === "#" ? 1 : 0),
    0
  )
);

// not 15, 51, 78
