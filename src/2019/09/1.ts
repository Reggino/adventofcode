import { readFileSync } from "fs";
import { join } from "path";

const defaultMem = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split(",")
  .map(line => Math.floor(parseInt(line, 10)));

class IntcodePc {
  private input: number[];
  private pc: number;
  private mem: number[];
  private relativeBase: number;

  public output: number[];

  constructor() {
    this.input = [];
    this.output = [];
    this.pc = 0;
    this.relativeBase = 0;
    this.mem = [];
  }

  public load(mem: number[]) {
    this.mem = [...mem, ...new Array(1000).fill(0)];
  }

  public addInput(input: number) {
    this.input.push(input);
  }

  private readArgument(mode?: number) {
    switch (mode) {
      case 1: // absolute
        return this.mem[this.pc++];

      case 2: // relative
        return this.mem[this.mem[this.pc++] + this.relativeBase];

      default:
      case 0: // position
        return this.mem[this.mem[this.pc++]];
    }
  }

  private writeArgument(mode: number | undefined, value: number):void {
    switch (mode) {
      case 1: // absolute
        throw new Error('Cannot write argument in absolute mode');

      case 2: // relative
        this.mem[this.mem[this.pc++] + this.relativeBase] = value;
        break;

      default:
      case 0: // position
        this.mem[this.mem[this.pc++]] = value;
        break;
    }
  }

  public run(): void {
    while (1) {
      const instruction = this.mem[this.pc++];
      const instructionParts = `${instruction}`
        .split("")
        .map(digit => parseInt(digit, 10));
      const opCode = instructionParts.pop();
      const zero = instructionParts.pop();
      let arg1: number;
      let arg2: number;

      if (zero && zero === 9) {
        // valid end of program
        return;
        //throw new Error("End of program");
        // return this.mem[0];
      }

      switch (opCode) {
        case 1: // sum
          arg1 = this.readArgument(instructionParts.pop());
          arg2 = this.readArgument(instructionParts.pop());
          this.writeArgument(instructionParts.pop(), arg1 + arg2);
          break;

        case 2: // mul
          arg1 = this.readArgument(instructionParts.pop());
          arg2 = this.readArgument(instructionParts.pop());
          this.writeArgument(instructionParts.pop(), arg1 * arg2);
          break;

        case 3: // input
          if (!this.input.length) {
            throw new Error("Missing required input");
          }
          this.writeArgument(instructionParts.pop(), this.input.shift() as number);
          break;

        case 4: // output
          const nextOutput = this.readArgument(instructionParts.pop());
          if (nextOutput === undefined) {
            return; // ???
          }
          this.output.push(nextOutput);
          break;

        case 5: // jump-if-true
          arg1 = this.readArgument(instructionParts.pop());
          arg2 = this.readArgument(instructionParts.pop());
          if (arg1 !== 0) {
            this.pc = arg2;
          }
          break;

        case 6: // jump-if-false
          arg1 = this.readArgument(instructionParts.pop());
          arg2 = this.readArgument(instructionParts.pop());
          if (arg1 === 0) {
            this.pc = arg2;
          }
          break;

        case 7: // less than
          arg1 = this.readArgument(instructionParts.pop());
          arg2 = this.readArgument(instructionParts.pop());
          this.writeArgument(instructionParts.pop(), arg1 < arg2 ? 1 : 0);
          break;

        case 8: // equals
          arg1 = this.readArgument(instructionParts.pop());
          arg2 = this.readArgument(instructionParts.pop());
          this.writeArgument(instructionParts.pop(), arg1 === arg2 ? 1 : 0);
          break;

        case 9:
          this.relativeBase += this.readArgument(instructionParts.pop());
          break;

        default:
          console.log(this.pc, opCode, this.mem);
          throw new Error("Invalid opcode");
      }
    }
  }
}

let pc = new IntcodePc();
pc.load(defaultMem);
pc.addInput(1);
pc.run();
console.log(pc.output);

pc = new IntcodePc();
pc.load(defaultMem);
pc.addInput(2);
pc.run();
console.log(pc.output);
