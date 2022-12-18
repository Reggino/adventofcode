import { readFileSync } from "fs";
import { join } from "path";
import { cloneDeep } from "lodash";

const rows = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");

const stackData = rows.slice(0, 8).reverse();
const stacks1: string[][] = Array(10)
  .fill(0)
  .map(() => []);

while (stackData.length) {
  const stackDataRow = stackData.shift() as string;
  for (let stackPointer = 1; stackPointer <= 9; stackPointer++) {
    const crate = stackDataRow[stackPointer * 4 - 3].trim();
    if (crate) {
      stacks1[stackPointer].push(crate);
    }
  }
}

const stacks2 = cloneDeep(stacks1);

const moveData = rows.slice(10);
moveData.forEach(instruction => {
  // move 3 from 9 to 4
  const [move, fromTo] = instruction.substring(5).split(" from ");
  const [from, to] = fromTo.split(" to ");
  const moveInt = parseInt(move);
  const fromIndex = parseInt(from);
  const toIndex = parseInt(to);

  // process stacks1
  for (let i = 0; i < moveInt; i++) {
    const crate = stacks1[fromIndex].pop() as string;
    stacks1[toIndex].push(crate);
  }

  // process stacks2
  const crates = stacks2[fromIndex].splice(
    stacks2[fromIndex].length - moveInt,
    moveInt
  );
  stacks2[toIndex].splice(stacks2[toIndex].length, 0, ...crates);
});

console.log(stacks1.map(stack => stack[stack.length - 1]).join(""));
console.log(stacks2.map(stack => stack[stack.length - 1]).join(""));
