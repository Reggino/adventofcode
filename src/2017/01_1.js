"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path = require('path');
console.log(fs_1.readFileSync(path.join(__dirname, './01/input.txt'), { encoding: 'utf-8' }).split('').reduce(function (prev, number, key, numbers) { return (number === numbers[key + 1]) ? prev + parseInt(number, 10) : prev; }, 2)); // 2 because first and last digits match
