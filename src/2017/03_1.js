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
    for (i = 2; i <= size; i++) {
        var key = void 0;
        switch (direction) {
            case 'right':
                col = result[row].push(i);
                if (!result[row - 1] || !result[row - 1][col - 1]) {
                    direction = 'up';
                    col -= 1;
                    row = result.length - 1;
                }
                break;
            case 'up':
                if (row === 0) {
                    newRow = new Array(col);
                    newRow[col] = i;
                    result.unshift(newRow);
                    direction = 'left';
                    continue;
                }
                row -= 1;
                result[row][col] = i;
                break;
            case 'left':
                if (col > 0) {
                    col -= 1;
                    result[0][col] = i;
                    continue;
                }
                // shift all rows ->
                result.forEach(function (row) {
                    row.unshift(undefined);
                });
                result[0][0] = i;
                row = 0;
                col = 0;
                direction = 'down';
            case 'down':
                if (row < result.length) {
                    result[row][0] = i;
                    row += 1;
                    continue;
                }
                row = result.push([i]) - 1;
                col = 0;
                direction = 'right';
        }
    }
    var center = Math.ceil(result.length / 2);
    console.log(row - center + center - col + 1);
    return result;
}
;
var spiral = createSpiral(368078);
//console.log(spiral.)
//.forEach(row => console.log(JSON.stringify(row))); 
