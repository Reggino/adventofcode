import { readFileSync } from "fs";
import * as path from "path";

const strings = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .split("\n")
  .filter(str => !!str);

const fabric: any[] = [];

strings.forEach(str => {
  const parsedString = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/g.exec(str) as any;
  const left = parseInt(parsedString[2], 10);
  const top = parseInt(parsedString[3], 10);
  const width = parseInt(parsedString[4], 10);
  const height = parseInt(parsedString[5], 10);
  for (let y = top; y < top + height; y++) {
    for (let x = left; x < left + width; x++) {
      if (!fabric[y]) {
        fabric[y] = [];
      }
      if (!fabric[y][x]) {
        fabric[y][x] = 0;
      }
      fabric[y][x] += 1;
    }
  }
});

let counter = 0;
fabric.forEach(row => {
  row.forEach((cell: number) => {
    counter += cell > 1 ? 1 : 0;
  });
});

console.log(counter);

// tslint:disable-next-line:variable-name
strings.forEach(string => {
  const parsedString = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/g.exec(string) as any;
  const left = parseInt(parsedString[2], 10);
  const top = parseInt(parsedString[3], 10);
  const width = parseInt(parsedString[4], 10);
  const height = parseInt(parsedString[5], 10);
  for (let y = top; y < top + height; y++) {
    for (let x = left; x < left + width; x++) {
      if (fabric[y][x] !== 1) {
        return;
      }
    }
  }
  console.log(string);
  process.exit(0);
});
