import { readFileSync } from "fs";
import { join } from "path";

const defaultMem = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split(",")
  .map(line => Math.floor(parseInt(line, 10)));

function run(inputs: number[]): number {
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
        if (!inputs.length) {
          throw new Error("Missing required input");
        }
        mem[mem[pc++]] = inputs.shift() as number;
        break;

      case 4: // output
        return readArgument(!!instructionParts.pop());

      case 5: // jump-if-true
        arg1 = readArgument(!!instructionParts.pop());
        arg2 = readArgument(!!instructionParts.pop());
        if (arg1 !== 0) {
          pc = arg2;
        }
        break;

      case 6: // jump-if-false
        arg1 = readArgument(!!instructionParts.pop());
        arg2 = readArgument(!!instructionParts.pop());
        if (arg1 === 0) {
          pc = arg2;
        }
        break;

      case 7: // less than
        arg1 = readArgument(!!instructionParts.pop());
        arg2 = readArgument(!!instructionParts.pop());
        mem[mem[pc++]] = arg1 < arg2 ? 1 : 0;
        break;

      case 8: // equals
        arg1 = readArgument(!!instructionParts.pop());
        arg2 = readArgument(!!instructionParts.pop());
        mem[mem[pc++]] = arg1 === arg2 ? 1 : 0;
        break;

      case 9:
        throw new Error("End of program?");
      // return mem[0];

      default:
        console.log(pc, opCode, mem);
        throw new Error("Invalid opcode");
    }
  }
  throw new Error("Run failed");
}

function runSeries(phaseSettings: number[]) {
  let output = 0;
  let phase = phaseSettings.shift();

  while (phase !== undefined) {
    output = run([phase, output]);
    phase = phaseSettings.shift();
  }
  return output;
}

// https://stackoverflow.com/questions/9960908/permutations-in-javascript
const permutator = (inputArr: number[]) => {
  let result: number[][] = [];

  const permute = (arr: number[], m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1) as any;
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

const combinations = permutator([0, 1, 2, 3, 4]);
console.log(
  combinations.reduce(
    (prev: number, combination: number[]) =>
      Math.max(prev, runSeries(combination)),
    0
  )
);
