import { readFileSync } from "fs";
import { join } from "path";
import { sum } from "lodash";

const lineFixes: { [key: string]: string } = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9"
};

function patch(line: string) {
  return Object.entries(lineFixes).reduce(
    (prev, [search, replace]) => prev.replace(search, replace),
    line
  );
}

const values = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => {
    const firstMatch = line.match(
      new RegExp(`(\\d|${Object.keys(lineFixes).join("|")})`)
    )!;
    const lastMatch = line.match(
      new RegExp(`.*(\\d|${Object.keys(lineFixes).join("|")})`)
    )!;

    return parseInt(`${patch(firstMatch[1])}${patch(lastMatch[1])}`);
  });

console.log(sum(values));
