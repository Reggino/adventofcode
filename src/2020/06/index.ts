import { readFileSync } from "fs";
import { join } from "path";

console.log(
  readFileSync(join(__dirname, "./input.txt"), {
    encoding: "utf-8"
  })
    .trim()
    .split("\n\n")
    .map(groupLines =>
      groupLines
        .trim()
        .split("\n")
        .reduce<{ [answer: string]: true }>(
          (groupPrev, personLine) =>
            personLine.split("").reduce((personPrev, personAnswer) => {
              groupPrev[personAnswer] = true;
              return groupPrev;
            }, groupPrev),
          {}
        )
    )
    .reduce((prev, groupAnswers) => prev + Object.keys(groupAnswers).length, 0)
);
