"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var path = require('path');
var lines = fs_1.readFileSync(path.join(__dirname, './04/input.txt'), { encoding: 'utf-8' }).split('\n');
console.log(lines.length);
console.log(lines.filter(function (line) {
    var words = line.split(' ');
    return words.length === lodash_1.uniq(words).length;
}).length);
