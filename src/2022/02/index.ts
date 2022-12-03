import { readFileSync } from "fs";
import { join } from "path";
import { startsWith, sum } from "lodash";

enum EOutcome {
  WIN,
  LOSE,
  DRAW
}

enum ERockPaperScissor {
  ROCK = "A",
  PAPER = "B",
  SCISSORS = "C"
}

enum EStrategy {
  X = "X",
  Y = "Y",
  Z = "Z"
}

const values = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(row => row.split(" ")) as [ERockPaperScissor, EStrategy][];

const answerValues = {
  A: 1,
  B: 2,
  C: 3
};

const strategyMap = {
  X: ERockPaperScissor.ROCK,
  Y: ERockPaperScissor.PAPER,
  Z: ERockPaperScissor.SCISSORS
};

const outcomes = {
  A: {
    A: EOutcome.DRAW,
    B: EOutcome.WIN,
    C: EOutcome.LOSE
  },
  B: {
    A: EOutcome.LOSE,
    B: EOutcome.DRAW,
    C: EOutcome.WIN
  },
  C: {
    A: EOutcome.WIN,
    B: EOutcome.LOSE,
    C: EOutcome.DRAW
  }
};

const scores = values.map(([request, strategy]) => {
  const answer = strategyMap[strategy];
  let score = answerValues[answer];
  let outcome = outcomes[request][answer];
  if (outcome === EOutcome.DRAW) {
    score += 3;
  }
  if (outcome === EOutcome.WIN) {
    score += 6;
  }
  return score;
});

// 11841
console.log(sum(scores));

const strategyScores = values.map(([request, strategy]) => {
  let answer: ERockPaperScissor | undefined = undefined;

  Object.entries(outcomes).forEach(([req, requestOutcomes]) => {
    if (req !== request) {
      return;
    }
    Object.entries(requestOutcomes).forEach(([response, outcome]) => {
      if (
        (strategy === EStrategy.X && outcome === EOutcome.LOSE) ||
        (strategy === EStrategy.Y && outcome === EOutcome.DRAW) ||
        (strategy === EStrategy.Z && outcome === EOutcome.WIN)
      ) {
        answer = response as ERockPaperScissor;
      }
    });
  });

  if (!answer) {
    throw new Error("Could not find answer");
  }
  let score: number = answerValues[answer];
  let outcome = outcomes[request][answer];
  if (outcome === EOutcome.DRAW) {
    score += 3;
  }
  if (outcome === EOutcome.WIN) {
    score += 6;
  }
  return score;
});

// 13022
console.log(sum(strategyScores));
