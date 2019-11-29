"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path = require('path');
var numbers = fs_1.readFileSync(path.join(__dirname, './01/input.txt'), { encoding: 'utf-8' }).split('');
var lookup = numbers.concat(numbers);
console.log(numbers.reduce(function (prev, number, key) { return ((number === lookup[key + (numbers.length / 2)]) ? prev + parseInt(number, 10) : prev); }, 0));
