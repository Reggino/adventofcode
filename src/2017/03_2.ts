function createSpiral(size: number): Array<Array<number | undefined>> {
  const result: Array<Array<number | undefined>> = [[]];
  if (!size) {
    return result;
  }
  result[0][0] = 1;
  let row: number = 0;
  let col: number = 0;
  let direction: string = "right";
  let i: number;
  let newRow: number[];

  function getValue(row: any, col: any): number {
    let value = 0;
    [row - 1, row, row + 1].forEach((rowPointer) => {
      [col - 1, col, col + 1].forEach((colPointer) => {
        if (result[rowPointer] && result[rowPointer][colPointer]) {
          value += result[rowPointer][colPointer] as number;
        }
      });
    });

    if (value > 368078) {
      console.log(value);
      process.exit(0);
    }

    return value;
  }

  for (i = 2; i <= size; i++) {
    let key;
    switch (direction) {
      case "right":
        col = result[row].push(getValue(row, col + 1)) - 1;
        if (!result[row - 1] || !result[row - 1][col]) {
          direction = "up";
          row = result.length - 1;
        }
        break;

      case "up":
        if (row === 0) {
          newRow = new Array(col);
          result.unshift(newRow);
          newRow[col] = getValue(0, col);

          direction = "left";
          continue;
        }
        row -= 1;
        result[row][col] = getValue(row, col);
        break;

      case "left":
        if (col > 0) {
          col -= 1;
          result[0][col] = getValue(row, col);
          continue;
        }
        // shift all rows ->
        result.forEach((row) => {
          row.unshift(undefined);
        });
        result[0][0] = getValue(0, 0);
        row = 1;
        col = 0;
        direction = "down";
        break;

      case "down":
        if (row < result.length) {
          result[row][0] = getValue(row, col);
          row += 1;
          continue;
        }
        row = result.push([getValue(result.length, 0)]) - 1;
        col = 0;
        direction = "right";
    }
  }

  return result;
}

const spiral = createSpiral(100000);

spiral.forEach((row) => console.log(JSON.stringify(row)));
