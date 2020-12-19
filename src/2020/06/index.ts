import { readFileSync } from "fs";
import { join } from "path";

const groupsLines = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n\n");

console.log(
  groupsLines
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

console.log(
  groupsLines
    .map(groupLines => {
      const personLines = groupLines.trim().split("\n");
      const answers = personLines.reduce<{ [answer: string]: number }>(
        (groupPrev, personLine) =>
          personLine.split("").reduce((personPrev, personAnswer) => {
            groupPrev[personAnswer] = (groupPrev[personAnswer] || 0) + 1;
            return groupPrev;
          }, groupPrev),
        {}
      );
      return Object.keys(answers).filter(
        answer => answers[answer] === personLines.length
      ).length;
    })
    .reduce((prev, answerCount) => prev + answerCount, 0)
);
