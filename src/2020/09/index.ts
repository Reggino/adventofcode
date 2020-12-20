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

let invalidNumber: number = 0;

numbers.forEach(number => {
  if (!check(number)) {
    invalidNumber = number;
    console.log("Check failed for", number);
  }
  // update check numbers
  checkNumbers.shift();
  checkNumbers.push(number);
});

function getContiguous(index: number): number[] | null {
  const result = [];
  let resultValue = 0;
  while (resultValue < invalidNumber) {
    resultValue += numbers[index + result.length];
    result.push(numbers[index + result.length]);
  }
  return resultValue === invalidNumber ? result : null;
}

for (let i = 0; i < numbers.length; i++) {
  const contiguous = getContiguous(i);
  if (contiguous) {
    const encryptionWeakness =
      Math.min(...contiguous) + Math.max(...contiguous);
    console.log("Found encryption weakness", encryptionWeakness);
    process.exit(0);
  }
}

console.log("At the end!");
