import { readFileSync } from "fs";
import { join } from "path";
import { sum } from "lodash";

const values = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => {
    const firstMatch = line.match(/^\D*(\d)/);
    const lastMatch = line.match(/(\d)\D*$/);

    if (!firstMatch || !lastMatch) {
      console.log(line);
      throw new Error("Could not read line");
    }
    return parseInt(`${firstMatch[1]}${lastMatch[1]}`);
  });

console.log(sum(values));
