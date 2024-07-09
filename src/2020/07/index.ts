import { readFileSync } from "fs";
import { join } from "path";

const rules = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8",
})
  .trim()
  .split("\n");

const depTree: {
  [color: string]: {
    parents: string[];
    contents: {
      color: string;
      quantity: number;
    }[];
  };
} = {};

// pale magenta bags contain 2 striped coral bags, 1 shiny orange bag, 3 vibrant white bags, 4 posh cyan bags.
rules.forEach((rule) => {
  const [containerColor, contents] = rule.split(" bags contain ");
  const contentColors: [number, string][] = contents
    .split(", ")
    .filter((rule) => rule.indexOf("no other bags") === -1)
    .map((content) => {
      const contentInfo = /(\d) (.+) bag/.exec(content);
      if (!contentInfo) {
        console.log(rule);
        throw new Error("Incorrect rule");
      }
      return [parseInt(contentInfo[1], 10), contentInfo[2]];
    });
  if (!depTree[containerColor]) {
    depTree[containerColor] = {
      parents: [],
      contents: [],
    };
  }
  contentColors.forEach((contentColorData) => {
    const [quantity, color] = contentColorData;
    if (!depTree[color]) {
      depTree[color] = {
        parents: [],
        contents: [],
      };
    }
    depTree[containerColor].contents.push({
      quantity,
      color,
    });
    depTree[color].parents.push(containerColor);
  });
});

const parentColors: string[] = [];
function addParents(color: string) {
  depTree[color].parents.forEach((parentColor) => {
    parentColors.push(parentColor);
    addParents(parentColor);
  });
}
addParents("shiny gold");

function getChildBagCount(color: string) {
  let bagCount = 0;
  depTree[color].contents.forEach((contentColor) => {
    bagCount += contentColor.quantity;
    bagCount += contentColor.quantity * getChildBagCount(contentColor.color);
  });
  return bagCount;
}

console.log(
  parentColors.filter((value, index, self) => self.indexOf(value) === index)
    .length,
  getChildBagCount("shiny gold"),
);
