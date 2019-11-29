"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var lines = fs_1.readFileSync(path_1.join(__dirname, './04/input.txt'), { encoding: 'utf-8' }).split('\n');
var noRepeats = function (w, _, ws) { return ws.filter(function (v) { return v === w; }).length === 1; };
var sortLetters = function (w) { return w.split('').sort().join(''); };
var isValid = function (f) { return function (ph) { return ph.split(' ').map(f).every(noRepeats); }; };
var count = function (f) { return lines.filter(isValid(f)).length; };
console.log([function (w) { return w; }, sortLetters].map(count));
