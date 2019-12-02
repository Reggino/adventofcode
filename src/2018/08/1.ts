import { readFileSync } from "fs";
import * as path from "path";

const numbers = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split(" ")
  .map(numberString => parseInt(numberString, 10));

let ptr = 0;
let metaValue = 0;

function readNode() {
  const numberOfChildNodes = numbers[ptr++];
  const numberOfMetadataEntries = numbers[ptr++];

  for (
    let childNodePtr = 0;
    childNodePtr < numberOfChildNodes;
    childNodePtr++
  ) {
    readNode();
  }
  for (
    let metaDataPtr = 0;
    metaDataPtr < numberOfMetadataEntries;
    metaDataPtr++
  ) {
    metaValue += numbers[ptr++];
  }
}

readNode();

console.log(metaValue);
