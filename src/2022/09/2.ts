import { readFileSync } from "fs";
import { join } from "path";

const DEBUG = 0;
const TAIL_LENGTH = 9;

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
  "0": {
    x: 0,
    y: 0
  },
  "1": {
    x: 0,
    y: 0
  },
  "2": {
    x: 0,
    y: 0
  },
  "3": {
    x: 0,
    y: 0
  },
  "4": {
    x: 0,
    y: 0
  },
  "5": {
    x: 0,
    y: 0
  },
  "6": {
    x: 0,
    y: 0
  },
  "7": {
    x: 0,
    y: 0
  },
  "8": {
    x: 0,
    y: 0
  },
  "9": {
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
      if (DEBUG) {
        console.log("\x1Bc");
        for (let y = state.minY; y <= state.maxY; y++) {
          for (let x = state.minX; x <= state.maxX; x++) {
            const tailIndex: string | undefined = Object.keys(state).find(
              stateKey => {
                return (
                  state[stateKey as "0"].x === x &&
                  state[stateKey as "0"].y === y &&
                  stateKey.match(/\d/)
                );
              }
            );
            if (tailIndex !== undefined) {
              process.stdout.write(tailIndex);
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
      }
      resolve();
    }, DEBUG * 50);
  });
}

function placeHead(instruction: "U" | "D" | "L" | "R") {
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

const tSpots: { [pos: string]: true } = { "0_0": true };

const getNextXY = (followerXY: number, followeeXY: number) => {
  switch (followerXY - followeeXY) {
    case 2:
      return followerXY - 1;

    case -2:
      return followerXY + 1;

    default:
      return followeeXY;
  }
};

function placeNext(index: number) {
  const followerKey = `${index}` as "1";
  const followeeKey = `${index - 1}` as "0";
  const followerX = state[followerKey].x;
  const followerY = state[followerKey].y;
  const followeeX = state[followeeKey].x;
  const followeeY = state[followeeKey].y;
  if (index === TAIL_LENGTH) {
    tSpots[`${state[followerKey]["x"]}_${state[followerKey]["y"]}`] = true;
  }

  const shouldMove =
    Math.abs(followerX - followeeX) > 1 || Math.abs(followerY - followeeY) > 1;
  if (!shouldMove) {
    return;
  }
  state[followerKey]["x"] = getNextXY(followerX, followeeX);
  state[followerKey]["y"] = getNextXY(followerY, followeeY);
}

async function main() {
  while (instruction) {
    let instructionStepPointer = 0;
    while (instructionStepPointer++ < instruction[1]) {
      placeHead(instruction[0]);
      for (let i = 1; i <= TAIL_LENGTH; i++) {
        placeNext(i);
      }
      await render();
    }
    instruction = instructions[++instructionPointer];
  }
}

render()
  .then(main)
  .then(() => {
    tSpots[
      `${state[`${TAIL_LENGTH}`]["x"]}_${state[`${TAIL_LENGTH}`]["y"]}`
    ] = true;
    if (DEBUG) {
      console.log(tSpots);
    }
    console.log(Object.keys(tSpots).length);
  })
  .catch(console.log);
