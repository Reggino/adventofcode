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

function getPathToRoot(planet: string) {
  let next = orbits[planet];
  const pathToRoot = [];
  while (next) {
    pathToRoot.push(next);
    next = orbits[next];
  }
  return pathToRoot;
}

const you = getPathToRoot("YOU");
const san = getPathToRoot("SAN");
const firstSharedNode = you.find(planet => san.indexOf(planet) >= 0) as string;
console.log(you.indexOf(firstSharedNode) + san.indexOf(firstSharedNode));
