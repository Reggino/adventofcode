import { readFileSync } from "fs";
import { join } from "path";

function getMap() {
  return readFileSync(join(__dirname, "./input.txt"), {
    encoding: "utf-8",
  })
    .trim()
    .split("\n")
    .map((row) => row.split(""));
}

interface IPoint {
  x: number;
  y: number;
  angle?: number;
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
  destVal: string,
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
      .map((point) => (map[point.y] ? map[point.y][point.x] : "."))
      .indexOf("#") === -1
  );
}

const shotPoints: IPoint[] = [];

function shoot(point: IPoint) {
  const angle =
    (Math.atan2(point.y - laserPoint.y, point.x - laserPoint.x) * 180) /
      Math.PI +
    90;
  shotPoints.push({
    ...point,
    angle: angle < 0 ? angle + 360 : angle,
  });
}

const laserPoint: IPoint = { x: 25, y: 31 };

const visibleMap = getMap().map((destRow, destY: number) => {
  return destRow.map((destVal, destX: number) =>
    isDestVisibleFromSource(laserPoint, { x: destX, y: destY }, destVal),
  );
});

visibleMap.forEach((visibleRow, visibleY: number) => {
  visibleRow.forEach((visibleVal: boolean, visibleX: number) => {
    if (visibleVal) {
      shoot({ x: visibleX, y: visibleY });
    }
  });
});

const shot200 = shotPoints.sort((a, b) => (a.angle || 0) - (b.angle || 0))[199];

console.log("done", shot200, shot200.x * 100 + shot200.y);
