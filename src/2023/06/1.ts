import { readFileSync } from "fs";
import { join } from "path";

const lines = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");

const times = lines[0]
  .split(/ +/)
  .slice(1)
  .map(time => parseInt(time));
const distances = lines[1]
  .split(/ +/)
  .slice(1)
  .map(time => parseInt(time));

function getNumberOfBeatCount(time: number, raceDistance: number) {
  let beatCount = 0;
  let buttonDownSecondCount = 0;
  while (buttonDownSecondCount++ < time) {
    const speed = buttonDownSecondCount;
    const moveDuration = time - buttonDownSecondCount;
    const distance = speed * moveDuration;
    if (distance > raceDistance) {
      beatCount++;
    }
  }
  return beatCount;
}

console.log(
  times
    .map((time, timeIndex) => getNumberOfBeatCount(time, distances[timeIndex]))
    .reduce((prev, number) => prev * number, 1)
);
