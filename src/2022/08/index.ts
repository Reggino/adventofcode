import { readFileSync } from "fs";
import { join } from "path";

const trees = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => line.split("").map(digit => parseInt(digit)));

function isVisible(rowIndex: number, columnIndex: number) {
  function isVisibleInDirection(dx: number, dy: number) {
    const oldTreeHeightPointer = trees[rowIndex][columnIndex];
    let rowPointer = rowIndex;
    let columnPointer = columnIndex;
    let newTreeHeightPointer: number | undefined = -1;
    while (newTreeHeightPointer !== undefined) {
      if (newTreeHeightPointer >= oldTreeHeightPointer) {
        return false;
      }
      rowPointer += dy;
      columnPointer += dx;
      newTreeHeightPointer = trees[rowPointer]
        ? trees[rowPointer][columnPointer]
        : undefined;
    }
    return true;
  }

  return (
    isVisibleInDirection(0, -1) ||
    isVisibleInDirection(1, 0) ||
    isVisibleInDirection(0, 1) ||
    isVisibleInDirection(-1, 0)
  );
}

let visibleTreeCount = 0;
const scenicScores: number[] = [];

function getScenicScore(y: number, x: number) {
  const rowLength = trees[0].length;
  const columnLength = trees.length;

  const rightTraverse = rowLength - x - 1;
  const bottomTraverse = columnLength - y - 1;

  let leftScore = x;
  let rightScore = rightTraverse;
  let topScore = y;
  let bottomScore = bottomTraverse;

  const currentTreeHeight = trees[y][x];

  for (let leftX = 1; leftX <= x; ++leftX) {
    if (trees[y][x - leftX] >= currentTreeHeight) {
      leftScore = leftX;
      break;
    }
  }
  for (let rightX = 1; rightX <= rightTraverse; ++rightX) {
    if (trees[y][x + rightX] >= currentTreeHeight) {
      rightScore = rightX;
      break;
    }
  }
  for (let topY = 1; topY <= y; ++topY) {
    if (trees[y - topY][x] >= currentTreeHeight) {
      topScore = topY;
      break;
    }
  }
  for (let bottomY = 1; bottomY <= bottomTraverse; ++bottomY) {
    if (trees[y + bottomY][x] >= currentTreeHeight) {
      bottomScore = bottomY;
      break;
    }
  }

  return leftScore * rightScore * topScore * bottomScore;
}

trees.forEach((treeRow, rowIndex) => {
  treeRow.forEach((tree, columnIndex) => {
    scenicScores.push(getScenicScore(rowIndex, columnIndex));
    if (isVisible(rowIndex, columnIndex)) {
      visibleTreeCount++;
    }
  });
});

// 120 too low
console.log(visibleTreeCount, Math.max(...scenicScores));
