import { readFileSync } from "fs";
import { join } from "path";

const orbits: { [planet: string]: string } = readFileSync(
  join(__dirname, "./input.txt"),
  {
    encoding: "utf-8"
  }
)
  .trim()
  .split("\n")
  .reduce((prev: { [planet: string]: string }, line) => {
    const lineData = line.split(")");
    prev[lineData[1]] = lineData[0];
    return prev;
  }, {});

function countOrbits(planet: string) {
  let next = orbits[planet];
  let numberOfOrbits = 0;
  while (next) {
    numberOfOrbits++;
    next = orbits[next];
  }
  return numberOfOrbits;
}

console.log(
  Object.keys(orbits)
    .map(countOrbits)
    .reduce((prev: number, orbitCount) => prev + orbitCount, 0)
);
