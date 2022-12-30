import { readFileSync } from "fs";
import { join } from "path";

const DEBUG = 1;

const instructions = readFileSync(join(__dirname, "./input.txt"), {
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
  H: {
    x: 0,
    y: 0
  },
  T: {
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
      state.minX = Math.min(state.H.x, state.minX);
      state.maxX = Math.max(state.H.x, state.maxX);
      state.minY = Math.min(state.H.y, state.minY);
      state.maxY = Math.max(state.H.y, state.maxY);
      if (!DEBUG) {
        return;
      }
      console.log("\x1Bc");
      for (let y = state.minY; y <= state.maxY; y++) {
        for (let x = state.minX; x <= state.maxX; x++) {
          if (state.H.x === x && state.H.y === y) {
            process.stdout.write("H");
            continue;
          }
          if (state.T.x === x && state.T.y === y) {
            process.stdout.write("T");
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
      state["H"]["y"] += instruction === "D" ? 1 : -1;
      break;

    case "L":
    case "R":
      state["H"]["x"] += instruction === "R" ? 1 : -1;
  }
}

const tSpots: { [pos: string]: true } = {};

function placeT() {
  // make tail follow
  const dx = state["T"]["x"] - state["H"]["x"];
  const dy = state["T"]["y"] - state["H"]["y"];
  if (dx < -1) {
    state["T"]["x"] += 1;
    state["T"]["y"] = state["H"]["y"];
  }
  if (dx > 1) {
    state["T"]["x"] -= 1;
    state["T"]["y"] = state["H"]["y"];
  }
  if (dy < -1) {
    state["T"]["x"] = state["H"]["x"];
    state["T"]["y"] += 1;
  }
  if (dy > 1) {
    state["T"]["x"] = state["H"]["x"];
    state["T"]["y"] -= 1;
  }
  tSpots[`${state["T"]["x"]}_${state["T"]["y"]}`] = true;
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
  .then(() => console.log(Object.keys(tSpots).length));
