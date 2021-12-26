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
          value.length === 2 || // 1
          value.length === 4 || // 4
          value.length === 3 || // 7
          value.length === 7 // 8
      ).length
    );
  }, 0)
);
