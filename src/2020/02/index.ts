import { readFileSync } from "fs";
import { join } from "path";

interface ILineData {
  from: number;
  to: number;
  letter: string;
  password: string;
}

const values = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => {
    const matches: any = /(\d+)-(\d+) (.): (.+)/.exec(line);
    return {
      from: parseInt(matches[1], 10),
      to: parseInt(matches[2], 10),
      letter: matches[3],
      password: matches[4]
    };
  }) as ILineData[];

console.log(
  values.reduce((prev, lineData) => {
    const letterCount = (
      lineData.password.match(new RegExp(lineData.letter, "g")) || []
    ).length;
    return letterCount >= lineData.from && letterCount <= lineData.to
      ? prev + 1
      : prev;
  }, 0)
);

console.log(
  values.reduce((prev, lineData) => {
    const matchCount =
      (lineData.password[lineData.from - 1] === lineData.letter ? 1 : 0) +
      (lineData.password[lineData.to - 1] === lineData.letter ? 1 : 0);
    return matchCount === 1 ? prev + 1 : prev;
  }, 0)
);
