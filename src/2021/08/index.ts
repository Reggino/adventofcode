import { readFileSync } from "fs";
import { join } from "path";

const entries = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => {
    const [uniqueSignalPatterns, outputValue] = line.split(" | ");
    return {
      uniqueSignalPatterns: uniqueSignalPatterns.split(" "),
      outputValues: outputValue.split(" ")
    };
  });

console.log(
  entries.reduce((prev, entry) => {
    return (
      prev +
      entry.outputValues.filter(
        value =>
          value.length === 2 ||
          value.length === 4 ||
          value.length === 3 ||
          value.length === 7
      ).length
    );
  }, 0)
);
