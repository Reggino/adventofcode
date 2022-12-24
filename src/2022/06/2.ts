import { readFileSync } from "fs";
import { join } from "path";
import { uniq } from "lodash";

const stream = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
}).trim();

const START_MARKER_LENGTH = 14;
let pointer = 0;
let allLettersDiffer = false;

while (!allLettersDiffer) {
  pointer++;
  const letters = stream
    .substring(pointer, pointer + START_MARKER_LENGTH)
    .split("");
  allLettersDiffer = uniq(letters).length === START_MARKER_LENGTH;
}

console.log(pointer + START_MARKER_LENGTH);
