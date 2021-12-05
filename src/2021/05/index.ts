import { readFileSync } from "fs";
import { join } from "path";

type TVector = { startX: number; startY: number; endX: number; endY: number };

const max = 1000;
const vectors: TVector[] = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => line.trim().split(" -> "))
  .map(([startString, endString]) => {
    const start = startString.split(",").map(x => parseInt(x, 10));
    const end = endString.split(",").map(x => parseInt(x, 10));
    return {
      startX: start[0],
      startY: start[1],
      endX: end[0],
      endY: end[1]
    };
  });

const dangerMap: (number | undefined)[][] = [];
function writeDangerPoint(x: number, y: number) {
  if (!dangerMap[y]) {
    dangerMap[y] = [];
  }
  if (!dangerMap[y][x]) {
    dangerMap[y][x] = 1;
    return;
  }
  // @ts-ignore
  dangerMap[y][x] += 1;
}

vectors.forEach(vector => {
  if (vector.startX === vector.endX) {
    let startY = Math.min(vector.startY, vector.endY);
    const endY = Math.max(vector.startY, vector.endY);
    while (startY <= endY) {
      writeDangerPoint(vector.startX, startY++);
    }
  }
  if (vector.startY === vector.endY) {
    let startX = Math.min(vector.startX, vector.endX);
    const endX = Math.max(vector.startX, vector.endX);
    while (startX <= endX) {
      writeDangerPoint(startX++, vector.startY);
    }
  }
});

console.log(
  dangerMap.reduce((prev, row) => {
    return (
      prev +
      (row
        ? row.reduce((prev: number, point) => {
            return prev + (point && point > 1 ? 1 : 0);
          }, 0)
        : 0)
    );
  }, 0)
);
