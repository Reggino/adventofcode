"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path = require('path');
var rows = fs_1.readFileSync(path.join(__dirname, './02/input.txt'), { encoding: 'utf-8' }).split('\n');
console.log(rows.reduce(function (prev, row) {
    var cells = row.split('\t').map(function (cell) { return parseInt(cell, 10); });
    var properDivideResult = 0;
    var _loop_1 = function () {
        var cell = cells.pop();
        cells.forEach(function (leftOverCell) {
            if (cell % leftOverCell) {
                if (leftOverCell % cell) {
                    return;
                }
                properDivideResult = leftOverCell / cell;
                return;
            }
            properDivideResult = cell / leftOverCell;
        });
    };
    while (!properDivideResult) {
        _loop_1();
    }
    return prev + properDivideResult;
}, 0));
