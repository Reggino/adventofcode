import { readFileSync } from "fs";
import { join } from "path";

const defaultMem = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split(",")
  .map(line => Math.floor(parseInt(line, 10)));

function run(noun: number, verb: number) {
  let pc = 0;
  const mem = [...defaultMem];
  mem[1] = noun;
  mem[2] = verb;

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
        return mem[0];

      default:
        console.log(pc, opCode, mem);
        throw new Error("Invalid opcode");
    }
  }
}

console.log("Answer 1 is", run(12, 2));

for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    if (run(noun, verb) === 19690720) {
      console.log("Answer 2 is", 100 * noun + verb);
    }
  }
}
