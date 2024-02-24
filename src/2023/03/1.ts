import { readFileSync } from "fs";
import { join } from "path";
import { sum } from "lodash";

interface INumberContext {
  rowIndex: number;
  colStartIndex: number;
  colEndIndex: number;
  number: number;
}

const lines = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");

const engineSchematic = lines.map(line => line.split(""));

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

const checkIsSymbol = (engineSchematic?: string) =>
  engineSchematic ? !engineSchematic.match(/[\d.]/) : false;

function checkIsPartNumber(numberContext: INumberContext): boolean {
  let hasTopRowAdjecentSymbol = false;
  const hasCenterRowAdjecentSymbol =
    checkIsSymbol(
      engineSchematic[numberContext.rowIndex][numberContext.colStartIndex - 1]
    ) ||
    checkIsSymbol(
      engineSchematic[numberContext.rowIndex][numberContext.colEndIndex + 1]
    );
  let hasBottomRowAdjectenSymbol = false;

  for (
    let colIndex = numberContext.colStartIndex - 1;
    colIndex <= numberContext.colEndIndex + 1;
    colIndex++
  ) {
    if (
      numberContext.rowIndex &&
      checkIsSymbol(engineSchematic[numberContext.rowIndex - 1][colIndex])
    ) {
      hasTopRowAdjecentSymbol = true;
    }
    if (
      numberContext.rowIndex < lines.length - 1 &&
      checkIsSymbol(engineSchematic[numberContext.rowIndex + 1][colIndex])
    ) {
      hasBottomRowAdjectenSymbol = true;
    }
  }

  return (
    hasTopRowAdjecentSymbol ||
    hasCenterRowAdjecentSymbol ||
    hasBottomRowAdjectenSymbol
  );
}

console.log(
  sum(
    numberContexts
      .filter(checkIsPartNumber)
      .map(numberContext => numberContext.number)
  )
);
