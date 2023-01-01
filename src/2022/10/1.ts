import { readFileSync } from "fs";
import { join } from "path";

let cycle = 1;
let x = 1;
const instructions = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => line.split(" ") as ["addx" | "noop", string]);

const measurementCycles = [20, 60, 100, 140, 180, 220];
let summedSignalStrengths = 0;

process.stdout.write(`Start cycle 1, value during cycle: ${x}`);
const endCycle = (deltaX?: number) => {
  if (deltaX !== undefined) {
    x = x + deltaX;
    process.stdout.write(`, cycle ended with new value ${x}\n`);
  } else {
    process.stdout.write("\n");
  }
  process.stdout.write(`Next cycle: ${++cycle}, value during cycle: ${x}`);
  if (measurementCycles.includes(cycle)) {
    summedSignalStrengths += cycle * x;
  }
};

let nextInstruction = instructions.shift();

while (nextInstruction) {
  switch (nextInstruction[0]) {
    case "addx":
      endCycle();
      endCycle(parseInt(nextInstruction[1]));
      break;

    case "noop":
      endCycle();
      break;
  }
  nextInstruction = instructions.shift();
}

console.log(`\n\n1: ${summedSignalStrengths}`);
