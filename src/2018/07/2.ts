import { readFileSync } from "fs";
import * as path from "path";

const instructions = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");

const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
const deps = alphabet.split("").reduce((prev, letter) => {
  prev[letter] = [];
  return prev;
}, {});

instructions.map(instruction => {
  const dependencyStep = instruction.substr(5, 1);
  const targetStep = instruction.substr(36, 1);

  if (!deps[targetStep]) {
    deps[targetStep] = [];
  }
  deps[targetStep].push(dependencyStep);
});

const executed = [];

const canExecute = (letter: string) => {
  if (executed.indexOf(letter) >= 0) {
    return false;
  }
  if (
    workerQueues.findIndex(
      queue => queue.findIndex(queueLetter => queueLetter === letter) >= 0
    ) >= 0
  ) {
    return false;
  }
  return !deps[letter].some(letterDeps => executed.indexOf(letterDeps) === -1);
};

const workerQueues = [[], [], [], [], []];
let secondsPassed = 0;

while (executed.length < alphabet.length) {
  // fill queues
  alphabet.split("").forEach(letter => {
    const freeWorkerIndex = workerQueues.findIndex(queue => !queue.length);
    if (freeWorkerIndex >= 0 && canExecute(letter)) {
      for (let i = 0; i < letter.charCodeAt(0) - 4; i++) {
        workerQueues[freeWorkerIndex].push(letter);
      }
      return;
    }
  });

  // show queues
  console.log(workerQueues);

  // process queues
  workerQueues.forEach(queue => {
    if (queue.length) {
      let executedLetter = queue.shift();
      if (!queue.length) {
        executed.push(executedLetter);
      }
    }
  });

  secondsPassed++;
}

console.log(secondsPassed);
