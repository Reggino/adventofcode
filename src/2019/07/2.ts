import { readFileSync } from "fs";
import { join } from "path";

const defaultMem = readFileSync(join(__dirname, "./input.txt"), {
    encoding: "utf-8"
})
  .trim()
  .split(",")
  .map(line => Math.floor(parseInt(line, 10)));

class Amp {
  private inputs: number[];
  private pc: number;
  private mem: number[];

  constructor(inputs: number[]) {
    this.inputs = inputs;
    this.pc = 0;
    this.mem = [...defaultMem];
  }

  run(input: number): number {
    this.inputs.push(input);

    const readArgument = (immediate: boolean) => {
      return immediate ? this.mem[this.pc++] : this.mem[this.mem[this.pc++]];
    };

    while (1) {
      const instruction = this.mem[this.pc++];
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
          this.mem[this.mem[this.pc++]] = arg1 + arg2;
          break;

        case 2: // mul
          arg1 = readArgument(!!instructionParts.pop());
          arg2 = readArgument(!!instructionParts.pop());
          this.mem[this.mem[this.pc++]] = arg1 * arg2;
          break;

        case 3: // input
          if (!this.inputs.length) {
            throw new Error("Missing required input");
          }
          this.mem[this.mem[this.pc++]] = this.inputs.shift() as number;
          break;

        case 4: // output
          return readArgument(!!instructionParts.pop());

        case 5: // jump-if-true
          arg1 = readArgument(!!instructionParts.pop());
          arg2 = readArgument(!!instructionParts.pop());
          if (arg1 !== 0) {
            this.pc = arg2;
          }
          break;

        case 6: // jump-if-false
          arg1 = readArgument(!!instructionParts.pop());
          arg2 = readArgument(!!instructionParts.pop());
          if (arg1 === 0) {
            this.pc = arg2;
          }
          break;

        case 7: // less than
          arg1 = readArgument(!!instructionParts.pop());
          arg2 = readArgument(!!instructionParts.pop());
          this.mem[this.mem[this.pc++]] = arg1 < arg2 ? 1 : 0;
          break;

        case 8: // equals
          arg1 = readArgument(!!instructionParts.pop());
          arg2 = readArgument(!!instructionParts.pop());
          this.mem[this.mem[this.pc++]] = arg1 === arg2 ? 1 : 0;
          break;

        case 9:
          throw new Error("End of program");
        // return this.mem[0];

        default:
          console.log(this.pc, opCode, this.mem);
          throw new Error("Invalid opcode");
      }
    }
    throw new Error("Run failed");
  }
}

function runSeries(phaseSettings: number[]) {
  let output = 0;
  let ampPointer = 0;
  const amps = phaseSettings.map(phaseSetting => new Amp([phaseSetting]));

  while (1) {
    try {
      output = amps[ampPointer++].run(output);
    } catch (e) {
      // end of program?!
      return output;
    }
    if (ampPointer >= amps.length) {
      ampPointer = 0;
    }
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

const combinations = permutator([5, 6, 7, 8, 9]);
console.log(
    combinations.reduce(
        (prev: number, combination: number[]) =>
            Math.max(prev, runSeries(combination)),
        0
    )
);
