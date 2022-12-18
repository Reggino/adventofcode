import { readFileSync } from "fs";
const path = require("path");

const rows = readFileSync(path.join(__dirname, "./02/input.txt"), {
  encoding: "utf-8"
}).split("\n");
console.log(
  rows.reduce((prev, row) => {
    const cells = row.split("\t").map(cell => parseInt(cell, 10));
    return prev + Math.max(...cells) - Math.min(...cells);
  }, 0)
);
