import { readFileSync } from "fs";
import { join } from "path";

const defaultMem = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split(",")
  .map(line => Math.floor(parseInt(line, 10)));

const PARAMETER = 1;

function run() {
  let pc = 0;
  const mem = [...defaultMem];

  function readArgument(immediate: boolean) {
    return immediate ? mem[pc++] : mem[mem[pc++]];
  }

  while (1) {
    const instruction = mem[pc++];
    const instructionParts = `${instruction}`
      .split("")
      .map(digit => parseInt(digit, 10));
    const opCode = instructionParts.pop();
    const zero = instructionParts.pop();
    let arg1: number;
    let arg2: number;

    switch (opCode) {
      case 1: // sum
        arg1 = readArgument(!!instructionParts.pop());
        arg2 = readArgument(!!instructionParts.pop());
        mem[mem[pc++]] = arg1 + arg2;
        break;

      case 2: // mul
        arg1 = readArgument(!!instructionParts.pop());
        arg2 = readArgument(!!instructionParts.pop());
        mem[mem[pc++]] = arg1 * arg2;
        break;

      case 3: // input
        mem[mem[pc++]] = PARAMETER;
        break;

      case 4: // output
        console.log(readArgument(!!instructionParts.pop()));
        break;

      case 9:
        return mem[0];

      default:
        console.log(pc, opCode, mem);
        throw new Error("Invalid opcode");
    }
  }
}

run();
