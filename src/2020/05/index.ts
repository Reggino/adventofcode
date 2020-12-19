import { readFileSync } from "fs";
import { join } from "path";

const passes = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");

interface IMinMax {
  min: number;
  max: number;
}

function getPassId(pass: string) {
  const rowletters = pass.substr(0, 7).split("") as Array<"F" | "B">;
  const columnLetters = pass.substr(7, 3).split("") as Array<"L" | "R">;

  const rowIndex = rowletters.reduce<IMinMax>(
    (prev, letter) => {
      const width = prev.max - prev.min;
      switch (letter) {
        case "F":
          return {
            ...prev,
            max: prev.max - Math.ceil(width / 2)
          };

        case "B":
          return {
            ...prev,
            min: prev.min + Math.ceil(width / 2)
          };
      }
    },
    { min: 0, max: 127 }
  );
  const columnIndex = columnLetters.reduce<IMinMax>(
    (prev, letter) => {
      const width = prev.max - prev.min;
      switch (letter) {
        case "L":
          return {
            ...prev,
            max: prev.max - Math.ceil(width / 2)
          };

        case "R":
          return {
            ...prev,
            min: prev.min + Math.ceil(width / 2)
          };
      }
    },
    { min: 0, max: 7 }
  );

  return rowIndex.min * 8 + columnIndex.min;
}

const passIds = passes.map(getPassId);
const highId = Math.max(...passIds);

for (let i = 100; i < highId; i++) {
  const index = passIds.findIndex(passId => passId === i);
  const prevIndex = passIds.findIndex(passId => passId === i - 1);
  const nextIndex = passIds.findIndex(passId => passId === i + 2);
  if (index === -1 && prevIndex >= 0 && nextIndex >= 0) {
    console.log(highId, i);
    process.exit(0);
  }
}
