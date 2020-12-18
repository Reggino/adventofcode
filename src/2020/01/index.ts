import { readFileSync } from "fs";
import { join } from "path";

const values = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => Math.floor(parseInt(line, 10)));

let pair: number[] = [];

values.forEach(valueA => {
  values.forEach(valueB => {
    if (valueA + valueB === 2020) {
      pair = [valueA, valueB];
    }
  });
});

console.log(pair[0] * pair[1]);

values.forEach(valueA => {
  values.forEach(valueB => {
    values.forEach(valueC => {
      if (valueA + valueB + valueC === 2020) {
        pair = [valueA, valueB, valueC];
      }
    });
  });
});

console.log(pair[0] * pair[1] * pair[2]);
