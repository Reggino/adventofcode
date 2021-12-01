import { readFileSync } from "fs";
import { join } from "path";

const result = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");
const busIds = result[1].split(",").map(id => parseInt(id, 10));
let wait = 100000000000000;

function isValid(waits: number[]): boolean {
  let last = waits[0];
  if (last !== 1) {
    return false;
  }
  for (let i = 1; i < waits.length; i++) {
    if (!isNaN(waits[i]) && waits[i] !== last + 1) {
      return false;
    }
    last += 1;
  }
  return true;
}

while (true) {
  const waits = busIds.map(busId => busId - (wait % busId));
  if (isValid(waits)) {
    console.log(wait + 1);
    process.exit(0);
  }
  if (wait === 200000000000000) {
    console.log("Not found!");
    process.exit(1);
  }
  wait += busIds[0];
}
