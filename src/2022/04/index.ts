import { readFileSync } from "fs";
import { join } from "path";
import { difference, intersection } from "lodash";

const pairs = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(row =>
    row.split(",").map(elf => {
      const digits = elf.split("-");
      const end = parseInt(digits[1]);
      let pointer = parseInt(digits[0]);
      const result = [pointer];
      while (end > pointer) {
        result.push(++pointer);
      }
      return result;
    })
  );

console.log(
  pairs.filter(
    pair =>
      difference(pair[0], pair[1]).length === 0 ||
      difference(pair[1], pair[0]).length === 0
  ).length,
  pairs.filter(pair => intersection(...pair).length).length
);
