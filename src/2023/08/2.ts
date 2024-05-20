import { readFileSync } from "fs";
import { join } from "path";

const lines = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8",
})
  .trim()
  .split("\n");

const instructions = lines.shift()!.split("") as Array<"R" | "L">;
const graph = lines.reduce<{ [location: string]: { L: string; R: string } }>(
  (prev, line) => {
    const graphData = line.match(/(.+) = \((.+), (.+)\)/);
    if (graphData) {
      prev[graphData[1]] = {
        L: graphData[2],
        R: graphData[3],
      };
    }
    return prev;
  },
  {},
);

let locations = Object.keys(graph).filter((location) => location.endsWith("A"));
let instructionPointer = 0;
let counter = 0;

while (locations.find((location) => !location.endsWith("Z"))) {
  const instruction = instructions[instructionPointer];
  if (++instructionPointer >= instructions.length) {
    instructionPointer = 0;
  }
  locations = locations.map((location) => graph[location][instruction]);
  counter++;
}

console.log(counter);
