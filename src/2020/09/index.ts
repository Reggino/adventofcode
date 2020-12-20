import { readFileSync } from "fs";
import { join } from "path";

const numbers: number[] = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => parseInt(line, 10));
const checkNumbers = numbers.splice(0, 25);

function check(number: number) {
  let index1 = -1;
  let index2 = 0;

  while (++index1 < checkNumbers.length) {
    while (++index2 < checkNumbers.length) {
      if (checkNumbers[index1] + checkNumbers[index2] === number) return true;
    }
    index2 = index1 + 1;
  }

  return false;
}

numbers.forEach(number => {
  if (!check(number)) {
    console.log("Check failed for", number);
    process.exit(0);
  }
  // update check numbers
  checkNumbers.shift();
  checkNumbers.push(number);
});

console.log("At the end!");
