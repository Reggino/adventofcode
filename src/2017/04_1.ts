import { readFileSync } from "fs";
import { uniq } from "lodash";
const path = require("path");

const lines = readFileSync(path.join(__dirname, "./04/input.txt"), {
  encoding: "utf-8"
}).split("\n");
console.log(lines.length);

console.log(
  lines.filter(line => {
    const words = line.split(" ");
    return words.length === uniq(words).length;
  }).length
);
