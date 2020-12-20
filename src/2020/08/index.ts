import { readFileSync } from "fs";
import { join } from "path";

interface IOp {
  code: "nop" | "acc" | "jmp";
  value: number;
}

const instructions: IOp[] = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => {
    const info = line.split(" ");
    return {
      code: info[0] as IOp["code"],
      value: parseInt(info[1], 10)
    };
  });

let acc = 0;
let pc = 0;
let instruction: IOp;
const debugData: { [pc: number]: true } = {};

while ((instruction = instructions[pc])) {
  if (debugData[pc]) {
    console.log(acc);
    process.exit(0);
  }
  debugData[pc] = true;
  switch (instruction.code) {
    case "acc":
      acc += instruction.value;
      pc += 1;
      break;

    case "jmp":
      pc += instruction.value;
      break;

    case "nop":
    default:
      pc += 1;
  }
}

// not 33
