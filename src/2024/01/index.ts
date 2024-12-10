import { readFileSync } from "fs";
import { join } from "path";

const values = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8",
})
  .trim()
  .split("\n")
  .map((line) => line.split(/ +/).map((nr) => parseInt(nr)));

const list1 = values.map((value) => value[0]).sort();
const list2 = values.map((value) => value[1]).sort();

console.log(
  list1.reduce(
    (prev, value, index) => prev + Math.abs(value - list2[index]),
    0,
  ),
);

console.log(
  list1.reduce((prev, value) => {
    const score = list2.filter((el) => el === value).length * value;
    return prev + score;
  }, 0),
);
