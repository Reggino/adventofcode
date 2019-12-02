import { readFileSync } from "fs";
import { join } from "path";

const mem = readFileSync(join(__dirname, "./input.txt"), { encoding: "utf-8" })
  .trim()
  .split(",")
  .map(line => Math.floor(parseInt(line, 10)));
let pc = 0;

mem[1] = 12;
mem[2] = 2;

while (1) {
  const opCode = mem[pc];
  switch (opCode) {
    case 1: // sum
      mem[mem[pc + 3]] = mem[mem[pc + 1]] + mem[mem[pc + 2]];
      pc += 4;
      break;

    case 2: // mul
      mem[mem[pc + 3]] = mem[mem[pc + 1]] * mem[mem[pc + 2]];
      pc += 4;
      break;

    case 99:
      console.log(mem);
      process.exit(0);
      break;

    default:
      console.log(pc, opCode, mem);
      throw new Error("Invalid opcode");
  }
}
