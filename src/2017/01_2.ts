import { readFileSync } from "fs";
const path = require("path");

const numbers = readFileSync(path.join(__dirname, "./01/input.txt"), {
  encoding: "utf-8"
}).split("");
const lookup = [...numbers, ...numbers];
console.log(
  numbers.reduce(
    (prev, number, key) =>
      number === lookup[key + numbers.length / 2]
        ? prev + parseInt(number, 10)
        : prev,
    0
  )
);
