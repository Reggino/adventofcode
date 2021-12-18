import { readFileSync } from "fs";
import { join } from "path";

const fishPerCount: [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
] = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split(",")
  .reduce(
    (prev, bit) => {
      prev[parseInt(bit, 10)] += 1;
      return prev;
    },
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  );

function getAfterDays(dayCount: number) {
  const afterDaysFishPerCount = [...fishPerCount];
  for (var i = 0; i < dayCount; i++) {
    const toBeSpawned = afterDaysFishPerCount[0];

    for (let j = 1; j <= 8; j++) {
      afterDaysFishPerCount[j - 1] = afterDaysFishPerCount[j];
      afterDaysFishPerCount[j] = 0;
    }
    afterDaysFishPerCount[6] += toBeSpawned;
    afterDaysFishPerCount[8] = toBeSpawned;
  }
  return Object.values(afterDaysFishPerCount).reduce(
    (prev, count) => prev + count,
    0
  );
}

console.log(getAfterDays(80));
console.log(getAfterDays(256));
