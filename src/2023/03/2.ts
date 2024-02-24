import { readFileSync } from "fs";
import { join } from "path";
import { sum } from "lodash";

interface INumberContext {
  rowIndex: number;
  colStartIndex: number;
  colEndIndex: number;
  number: number;
}

interface IGearContext {
  rowIndex: number;
  colIndex: number;
  numberContexts: INumberContext[];
}

const lines = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");

const numberContexts = lines.reduce<INumberContext[]>(
  (prev, line, rowIndex) => {
    for (const lineResult of [...line.matchAll(/\d+/g)]) {
      prev.push({
        rowIndex,
        colStartIndex: lineResult.index!,
        colEndIndex: lineResult.index! + lineResult[0].length - 1,
        number: parseInt(lineResult[0])
      });
    }
    return prev;
  },
  []
);

const getGearRatio = (gear: IGearContext) =>
  gear.numberContexts[0].number * gear.numberContexts[1].number;

const gears = lines.reduce<IGearContext[]>((prev, line, rowIndex) => {
  for (const lineResult of [...line.matchAll(/\*/g)]) {
    const colIndex = lineResult!.index!;
    const gearContext = {
      rowIndex,
      colIndex,
      numberContexts: numberContexts.filter(numberContext => {
        return (
          [
            numberContext.rowIndex - 1,
            numberContext.rowIndex,
            numberContext.rowIndex + 1
          ].includes(rowIndex) &&
          colIndex >= numberContext.colStartIndex - 1 &&
          colIndex <= numberContext.colEndIndex + 1
        );
      })
    };
    if (gearContext.numberContexts.length === 2) {
      prev.push(gearContext);
    }
  }
  return prev;
}, []);

console.log(sum(gears.map(getGearRatio)));
