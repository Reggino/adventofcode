"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var instructions = fs_1.readFileSync(path_1.join(__dirname, './05/input.txt'), { encoding: 'utf-8' }).split('\n').map(function (number) { return parseInt(number, 10); });
//const instructions = [0,3,0,1,-3];
var pointer = 0;
var step = 0;
while ((pointer >= 0) && (pointer <= instructions.length)) {
    var lastPointer = pointer;
    pointer += instructions[pointer];
    instructions[lastPointer]++;
    step++;
}
console.log(step - 1);
