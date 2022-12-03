import { readFileSync } from "fs";
import { join } from "path";
import { sum } from "lodash";

enum EOutcome {
  WIN,
  LOSE,
  DRAW
}

const values = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(row => row.split(" ")) as ["A" | "B" | "C", "X" | "Y" | "Z"][];

const scores = values.map(([request, answer]) => {
  let score = 0;
  let outcome: EOutcome = EOutcome.DRAW;

  switch (answer) {
    case "X":
      score += 1;
      if (request === "B") {
        outcome = EOutcome.LOSE;
      }
      if (request === "C") {
        outcome = EOutcome.WIN;
      }
      break;

    case "Y":
      score += 2;
      if (request === "A") {
        outcome = EOutcome.WIN;
      }
      if (request === "C") {
        outcome = EOutcome.LOSE;
      }
      break;

    case "Z":
      score += 3;
      if (request === "A") {
        outcome = EOutcome.LOSE;
      }
      if (request === "B") {
        outcome = EOutcome.WIN;
      }
      break;
  }

  if (outcome === EOutcome.DRAW) {
    score += 3;
  }
  if (outcome === EOutcome.WIN) {
    score += 6;
  }
  return score;
});

// 12196 is too high
console.log(sum(scores));
