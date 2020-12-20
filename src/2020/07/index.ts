import { readFileSync } from "fs";
import { join } from "path";

const rules = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");

const depTree: {
  [color: string]: {
    parents: string[];
    contents: string[];
  };
} = {};

// pale magenta bags contain 2 striped coral bags, 1 shiny orange bag, 3 vibrant white bags, 4 posh cyan bags.
rules.forEach(rule => {
  const [containerColor, contents] = rule.split(" bags contain ");
  const contentColors = contents
    .split(", ")
    .filter(rule => rule.indexOf("no other bags") === -1)
    .map(content => {
      const contentInfo = /\d (.+) bag/.exec(content);
      if (!contentInfo) {
        console.log(rule);
        throw new Error("Incorrect rule");
      }
      return contentInfo[1];
    });
  if (!depTree[containerColor]) {
    depTree[containerColor] = {
      parents: [],
      contents: []
    };
  }
  contentColors.forEach(contentColor => {
    if (!depTree[contentColor]) {
      depTree[contentColor] = {
        parents: [],
        contents: []
      };
    }
    depTree[containerColor].contents.push(contentColor);
    depTree[contentColor].parents.push(containerColor);
  });
});

let parentColors: string[] = [];
function addParents(color: string) {
  depTree[color].parents.forEach(parentColor => {
    parentColors.push(parentColor);
    addParents(parentColor);
  });
}

addParents("shiny gold");

console.log(
  parentColors.filter((value, index, self) => {
    return self.indexOf(value) === index;
  }).length
);

// lower than 298
