import { readFileSync } from "fs";
const path = require("path");

const strings = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .split("\n")
  .filter(string => !!string);

let wordsWith2EqualLetters = 0;
let wordsWith3EqualLetters = 0;

strings.forEach(string => {
  const letterCountHash = string.split("").reduce((prev, letter) => {
    if (!prev[letter]) {
      prev[letter] = 1;
    } else {
      prev[letter] += 1;
    }
    return prev;
  }, {});

  if (Object.values(letterCountHash).indexOf(2) > -1) {
    wordsWith2EqualLetters += 1;
  }
  if (Object.values(letterCountHash).indexOf(3) > -1) {
    wordsWith3EqualLetters += 1;
  }
});

console.log(
  `${wordsWith2EqualLetters} x ${wordsWith3EqualLetters} = ${wordsWith2EqualLetters *
    wordsWith3EqualLetters}`
);

strings.forEach(inputString => {
  strings.forEach(testString => {
    let matches = 0;
    inputString.split("").forEach((letter, letterIndex) => {
      matches += testString[letterIndex] === letter ? 1 : 0;
    });
    if (inputString.length - 1 === matches) {
      console.log(inputString, testString);
      process.exit(0);
    }
  });
});
