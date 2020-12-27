import { readFileSync } from "fs";
import { join } from "path";

const result = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");
const minWait = parseInt(result[0], 10);
const busIds = result[1]
  .split(",")
  .map(id => parseInt(id, 10))
  .filter(id => !isNaN(id));
const waits = busIds.map(busId => busId - (minWait % busId));
const shortWait = Math.min(...waits);
const busId = busIds[waits.findIndex(wait => wait === shortWait)];
console.log(busId * shortWait);
