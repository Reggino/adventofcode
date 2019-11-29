import { readFileSync } from "fs";
const path = require("path");

const numbers = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .split("\n")
  .map(number => (number ? parseInt(number, 10) : 0))
  .filter(number => !!number);

console.log(numbers.reduce((prev, number) => prev + number, 0));

const hash = {};
let currentValue = 0;

while (1) {
  currentValue = numbers.reduce((prev, number) => {
    const result = prev + number;
    if (hash[result]) {
      console.log(result);
      process.exit(0);
    }
    hash[result] = true;
    return prev + number;
  }, currentValue);
}

console.log("not found");
