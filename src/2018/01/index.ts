import { readFileSync } from "fs";
import * as path from "path";

const numbers = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .split("\n")
  .map(nr => (nr ? parseInt(nr, 10) : 0))
  .filter(nr => !!nr);

console.log(numbers.reduce((prev, nr) => prev + nr, 0));

const hash: { [key: number]: boolean } = {};
let currentValue = 0;

while (1) {
  currentValue = numbers.reduce((prev, nr) => {
    const result = prev + nr;
    if (hash[result]) {
      console.log(result);
      process.exit(0);
    }
    hash[result] = true;
    return prev + nr;
  }, currentValue);
}

console.log("not found");
