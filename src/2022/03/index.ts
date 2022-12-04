import { readFileSync } from "fs";
import { join } from "path";
import { chunk, intersection } from "lodash";

const rucksacks = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(row => [
    row.substring(0, row.length / 2),
    row.substring(row.length / 2)
  ]) as [string, string][];

function getPrio(type: string) {
  const asciiValue = type.charCodeAt(0);
  const isUppercase = asciiValue < 91;
  return asciiValue - (isUppercase ? 38 : 96);
}

console.log(
  rucksacks.reduce((prev, [comp1, comp2]) => {
    const items1 = comp1.split("");
    const items2 = comp2.split("");
    return prev + getPrio(intersection(items1, items2)[0]);
  }, 0),
  chunk(rucksacks, 3).reduce(
    (prev, group) =>
      prev +
      getPrio(
        intersection(
          ...group.map(([comp1, comp2]) => [
            ...comp1.split(""),
            ...comp2.split("")
          ])
        )[0]
      ),
    0
  )
);
