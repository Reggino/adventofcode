import { readFileSync } from "fs";
const path = require("path");

console.log(
  readFileSync(path.join(__dirname, "./01/input.txt"), { encoding: "utf-8" })
    .split("")
    .reduce(
      (prev, number, key, numbers) =>
        number === numbers[key + 1] ? prev + parseInt(number, 10) : prev,
      2
    )
); // 2 because first and last digits match
