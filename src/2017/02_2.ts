import { readFileSync } from 'fs';
const path = require('path');

const rows: Array<string> = readFileSync(path.join(__dirname, './02/input.txt'), {encoding: 'utf-8'}).split('\n');
console.log(rows.reduce((prev, row) => {
    const cells : Array<number> = row.split('\t').map(cell => parseInt(cell, 10));

    let properDivideResult : number = 0;
    while (!properDivideResult) {
        const cell = cells.pop();
        cells.forEach(leftOverCell => {
            if (cell % leftOverCell) {
                if (leftOverCell % cell) {
                    return;
                }
                properDivideResult = leftOverCell / cell;
                return;
            }
            properDivideResult = cell / leftOverCell;
        });
    }
    return prev + properDivideResult;
}, 0));