import { readFileSync } from "fs";
import { join } from "path";

const commands = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => {
    const lineData = line.split(" ");
    return {
      op: lineData[0],
      quantity: parseInt(lineData[1], 10)
    };
  });

let resultPos = commands.reduce(
  (prev, command) => {
    switch (command.op) {
      case "forward":
        prev.hor += command.quantity;
        break;

      case "down":
        prev.depth += command.quantity;
        break;

      case "up":
        prev.depth -= command.quantity;
        break;

      default:
        throw new Error(JSON.stringify(command));
    }
    return prev;
  },
  { hor: 0, depth: 0 }
);

console.log(resultPos.hor * resultPos.depth);

resultPos = commands.reduce(
  (prev, command) => {
    switch (command.op) {
      case "forward":
        prev.hor += command.quantity;
        prev.depth += prev.aim * command.quantity;
        break;

      case "down":
        prev.aim += command.quantity;
        break;

      case "up":
        prev.aim -= command.quantity;
        break;

      default:
        throw new Error(JSON.stringify(command));
    }
    return prev;
  },
  { hor: 0, depth: 0, aim: 0 }
);

console.log(resultPos.hor * resultPos.depth);
