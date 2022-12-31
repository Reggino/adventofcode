import { readFileSync } from "fs";
import { join } from "path";

const DEBUG = 1;

const instructions = readFileSync(join(__dirname, "./sample.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => line.split(" ") as ["D" | "L" | "U" | "R", number]);

let instructionPointer = 0;
let instruction = instructions[instructionPointer];
const state = {
  minX: 0,
  maxX: 0,
  minY: 0,
  maxY: 0,
  "0": {
    x: 0,
    y: 0
  },
  "1": {
    x: 0,
    y: 0
  },
  s: {
    x: 0,
    y: 0
  }
};

function render() {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      // console.log(state);
      state.minX = Math.min(state["0"].x, state.minX);
      state.maxX = Math.max(state["0"].x, state.maxX);
      state.minY = Math.min(state["0"].y, state.minY);
      state.maxY = Math.max(state["0"].y, state.maxY);
      if (!DEBUG) {
        return;
      }
      console.log("\x1Bc");
      for (let y = state.minY; y <= state.maxY; y++) {
        for (let x = state.minX; x <= state.maxX; x++) {
          if (state["0"].x === x && state["0"].y === y) {
            process.stdout.write("0");
            continue;
          }
          if (state["1"].x === x && state["1"].y === y) {
            process.stdout.write("1");
            continue;
          }
          if (state.s.x === x && state.s.y === y) {
            process.stdout.write("s");
            continue;
          }
          process.stdout.write(".");
        }
        process.stdout.write("\n");
      }
      resolve();
    }, DEBUG);
  });
}

function placeH(instruction: "U" | "D" | "L" | "R") {
  switch (instruction) {
    case "U":
    case "D":
      state["0"]["y"] += instruction === "D" ? 1 : -1;
      break;

    case "L":
    case "R":
      state["0"]["x"] += instruction === "R" ? 1 : -1;
  }
}

const tSpots: { [pos: string]: true } = {};

function placeT() {
  // make tail follow
  const dx = state["1"]["x"] - state["0"]["x"];
  const dy = state["1"]["y"] - state["0"]["y"];
  if (dx < -1) {
    state["1"]["x"] += 1;
    state["1"]["y"] = state["0"]["y"];
  }
  if (dx > 1) {
    state["1"]["x"] -= 1;
    state["1"]["y"] = state["0"]["y"];
  }
  if (dy < -1) {
    state["1"]["x"] = state["0"]["x"];
    state["1"]["y"] += 1;
  }
  if (dy > 1) {
    state["1"]["x"] = state["0"]["x"];
    state["1"]["y"] -= 1;
  }
  tSpots[`${state["1"]["x"]}_${state["1"]["y"]}`] = true;
}

async function main() {
  while (instruction) {
    let instructionStepPointer = 0;
    while (instructionStepPointer++ < instruction[1]) {
      placeH(instruction[0]);
      placeT();
      await render();
    }
    instruction = instructions[++instructionPointer];
  }
}

render()
  .then(main)
  .then(() => console.log(Object.keys(tSpots).length))
  .catch(console.log);
