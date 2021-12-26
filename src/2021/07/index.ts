import { readFileSync } from "fs";
import { join } from "path";

const positions = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split(",")
  .reduce<number[]>((prev, position) => [...prev, parseInt(position, 10)], []);

// 7a
let lowGasUsage = Number.MAX_SAFE_INTEGER;

for (let i = 0; i < Math.max(...positions); i++) {
  lowGasUsage = Math.min(
    lowGasUsage,
    positions.reduce((prev, position) => prev + Math.abs(position - i), 0)
  );
}

console.log(lowGasUsage);

// 7b
function getGasUsage(distance: number): number {
  let gasUsage = 0;
  for (let i = 1; i <= distance; i++) {
    gasUsage += i;
  }
  return gasUsage;
}

let lowTotalGasUsage = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < Math.max(...positions); i++) {
  lowTotalGasUsage = Math.min(
    lowTotalGasUsage,
    positions.reduce(
      (prev, position) => prev + getGasUsage(Math.abs(position - i)),
      0
    )
  );
}

console.log(lowTotalGasUsage);
