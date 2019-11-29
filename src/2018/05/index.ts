import { readFileSync } from "fs";
import * as path from "path";

let target = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8"
}).trim();

const alphabet = "abcdefghijklmnopqrstuvwxyz";
let startLength = 1;
let endLength = 0;
while (startLength !== endLength) {
  startLength = target.length;
  alphabet.split("").forEach(letter => {
    target = target
      .replace(new RegExp(`${letter}${letter.toUpperCase()}`, "g"), "")
      .replace(new RegExp(`${letter.toUpperCase()}${letter}`, "g"), "");
  });
  endLength = target.length;
}
console.log(`WITHOUT LETTER EXTRACT: ${endLength}`);

alphabet.split("").forEach(letter => {
  let withoutLetterTarget = target.replace(new RegExp(letter, "gi"), "");
  startLength = 1;
  endLength = 0;
  while (startLength !== endLength) {
    startLength = withoutLetterTarget.length;
    alphabet.split("").forEach(letter => {
      withoutLetterTarget = withoutLetterTarget
        .replace(new RegExp(`${letter}${letter.toUpperCase()}`, "g"), "")
        .replace(new RegExp(`${letter.toUpperCase()}${letter}`, "g"), "");
    });
    endLength = withoutLetterTarget.length;
  }
  console.log(`EXTRACT ${letter.toUpperCase()}: ${endLength}`);
});
