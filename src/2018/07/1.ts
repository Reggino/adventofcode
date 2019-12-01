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
  return !deps[letter].some(letterDeps => executed.indexOf(letterDeps) === -1);
};

while (executed.length < alphabet.length) {
  alphabet.split("").some(letter => {
    if (canExecute(letter)) {
      executed.push(letter);
      return true;
    }
    return false;
  });
}

console.log(executed.join(""));
