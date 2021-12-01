import { readFileSync } from "fs";
import { join } from "path";

const values = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => Math.floor(parseInt(line, 10)));

let lastNumber = Number.MAX_SAFE_INTEGER;

console.log(
  values.reduce((prev, value) => {
    const res = prev + (value > lastNumber ? 1 : 0);
    lastNumber = value;
    return res;
  }, 0)
);

console.log(
  values.reduce((prev, value, key) => {
    const nextNumber = value + values[key + 1] + values[key + 2];
    const res = prev + (nextNumber > lastNumber ? 1 : 0);
    lastNumber = nextNumber;
    return res;
  }, 0)
);
