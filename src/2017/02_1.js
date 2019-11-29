"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path = require('path');
var rows = fs_1.readFileSync(path.join(__dirname, './02/input.txt'), { encoding: 'utf-8' }).split('\n');
console.log(rows.reduce(function (prev, row) {
    var cells = row.split('\t').map(function (cell) { return parseInt(cell, 10); });
    return prev + Math.max.apply(Math, cells) - Math.min.apply(Math, cells);
}, 0));
