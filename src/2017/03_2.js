"use strict";
exports.__esModule = true;
function createSpiral(size) {
    var result = [[]];
    if (!size) {
        return result;
    }
    result[0][0] = 1;
    var row = 0;
    var col = 0;
    var direction = 'right';
    var i;
    var newRow;
    function getValue(row, col) {
        var value = 0;
        [row - 1, row, row + 1].forEach(function (rowPointer) {
            [col - 1, col, col + 1].forEach(function (colPointer) {
                if (result[rowPointer] && result[rowPointer][colPointer]) {
                    value += result[rowPointer][colPointer];
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
        var key = void 0;
        switch (direction) {
            case 'right':
                col = result[row].push(getValue(row, col + 1)) - 1;
                if (!result[row - 1] || !result[row - 1][col]) {
                    direction = 'up';
                    row = result.length - 1;
                }
                break;
            case 'up':
                if (row === 0) {
                    newRow = new Array(col);
                    result.unshift(newRow);
                    newRow[col] = getValue(0, col);
                    direction = 'left';
                    continue;
                }
                row -= 1;
                result[row][col] = getValue(row, col);
                break;
            case 'left':
                if (col > 0) {
                    col -= 1;
                    result[0][col] = getValue(row, col);
                    continue;
                }
                // shift all rows ->
                result.forEach(function (row) {
                    row.unshift(undefined);
                });
                result[0][0] = getValue(0, 0);
                row = 1;
                col = 0;
                direction = 'down';
                break;
            case 'down':
                if (row < result.length) {
                    result[row][0] = getValue(row, col);
                    row += 1;
                    continue;
                }
                row = result.push([getValue(result.length, 0)]) - 1;
                col = 0;
                direction = 'right';
        }
    }
    return result;
}
;
var spiral = createSpiral(100000);
spiral.forEach(function (row) { return console.log(JSON.stringify(row)); });
