import { readFileSync } from "fs";
import { join } from "path";
import { difference, intersection } from "lodash";

const rows = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");

const stackData = rows.slice(0, 8).reverse();
const stacks: string[][] = Array(10)
  .fill(0)
  .map(() => []);

while (stackData.length) {
  const stackDataRow = stackData.shift();
  if (!stackDataRow) {
    throw new Error("buh");
  }
  for (let stackPointer = 1; stackPointer <= 9; stackPointer++) {
    const crate = stackDataRow[stackPointer * 4 - 3].trim();
    if (crate) {
      stacks[stackPointer].push(crate);
    }
  }
}

const moveData = rows.slice(10);
moveData.forEach(instruction => {
  // move 3 from 9 to 4
  const [move, fromTo] = instruction.substring(5).split(" from ");
  const [from, to] = fromTo.split(" to ");
  for (let i = 0; i < parseInt(move); i++) {
    const crate = stacks[parseInt(from)].pop() as string;
    stacks[parseInt(to)].push(crate);
  }
});

console.log(stacks.map(stack => stack[stack.length - 1]).join(""));
