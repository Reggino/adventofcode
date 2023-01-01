import { readFileSync } from "fs";
import { join } from "path";

const DEBUG = 0;

let cycle = 0;
let x = 1;
const instructions = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => line.split(" ") as ["addx" | "noop", string]);

if (DEBUG) {
  process.stderr.write(`Start cycle 1, value during cycle: ${x}`);
}
process.stdout.write("#");

const endCycle = (deltaX?: number) => {
  if (deltaX !== undefined) {
    x = x + deltaX;
    if (DEBUG) {
      process.stderr.write(`, cycle ended with new value ${x}\n`);
    }
  } else {
    if (DEBUG) {
      process.stderr.write("\n");
    }
  }
  cycle++;
  if (DEBUG) {
    process.stderr.write(`Next cycle: ${cycle}, value during cycle: ${x}`);
  }
  const rowPosition = cycle % 40;
  if (rowPosition === 0) {
    process.stdout.write("\n");
  }
  process.stdout.write(Math.abs(x - rowPosition) > 1 ? "." : "#");
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
