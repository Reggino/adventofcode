import { readFileSync } from "fs";
import { join } from "path";

const treeMap = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");

const getTreeCount = (rightDelta: number, downDelta: number) => {
  let right = rightDelta;
  let down = downDelta;
  let result = 0;
  while (down < treeMap.length) {
    result += treeMap[down][right % treeMap[down].length] === "#" ? 1 : 0;
    right += rightDelta;
    down += downDelta;
  }
  return result;
};

console.log(
  getTreeCount(3, 1),
  getTreeCount(1, 1) *
    getTreeCount(3, 1) *
    getTreeCount(5, 1) *
    getTreeCount(7, 1) *
    getTreeCount(1, 2)
);
