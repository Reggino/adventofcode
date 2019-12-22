import { readFileSync } from "fs";
import { join } from "path";

function getMap() {
  return readFileSync(join(__dirname, "./input.txt"), {
    encoding: "utf-8"
  })
    .trim()
    .split("\n")
    .map(row => row.split(""));
}

interface IPoint {
  x: number;
  y: number;
}

function getGridPointsBetween(source: IPoint, dest: IPoint): IPoint[] {
  const result: IPoint[] = [];
  if (source.x === dest.x) {
    if (dest.y > source.y) {
      while (--dest.y > source.y) {
        result.push({ ...dest });
      }
      return result;
    }

    while (++dest.y < source.y) {
      result.push({ ...dest });
    }
    return result;
  }

  const dy = dest.y - source.y;
  const dx = dest.x - source.x;

  function walkDest(direction: number) {
    dest.y += direction * (dy / dx);
    const roundY = Math.round(dest.y);
    if (Math.abs(roundY - dest.y) < 0.0001) {
      dest.y = roundY;
    }
    return dest;
  }

  if (dest.x > source.x) {
    while (--dest.x > source.x) {
      result.push({ ...walkDest(-1) });
    }
  }
  if (dest.x < source.x) {
    while (++dest.x < source.x) {
      result.push({ ...walkDest(1) });
    }
  }
  return result;
}

function isDestVisibleFromSource(
  sourcePoint: IPoint,
  destPoint: IPoint,
  destVal: string
): boolean {
  if (
    (sourcePoint.x === destPoint.x && sourcePoint.y === destPoint.y) ||
    destVal === "."
  ) {
    return false;
  }

  // find if there is something in the way...
  const map = getMap();
  return (
    getGridPointsBetween(sourcePoint, destPoint)
      .map(point => (map[point.y] ? map[point.y][point.x] : "."))
      .indexOf("#") === -1
  );
}

let highVisibleCount: number = 0;
let highVisiblePoint: IPoint | null = null;

getMap().forEach((sourceRow: string[], sourceY: number) => {
  sourceRow.forEach((sourceVal, sourceX: number) => {
    if (sourceVal === "#") {
      const visibleMap = getMap().map((destRow, destY: number) => {
        return destRow.map((destVal, destX: number) =>
          isDestVisibleFromSource(
            { x: sourceX, y: sourceY },
            { x: destX, y: destY },
            destVal
          )
        );
      });
      const visibleCount = visibleMap.reduce(
        (prev, row) =>
          prev +
          row.reduce((prev: number, cell: boolean) => prev + (cell ? 1 : 0), 0),
        0
      );
      if (visibleCount > highVisibleCount) {
        highVisibleCount = visibleCount;
        highVisiblePoint = { x: sourceX, y: sourceY };
      }
    }
  });
});

console.log(highVisibleCount, highVisiblePoint);
