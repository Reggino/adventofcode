import { readFileSync } from "fs";
import { join } from "path";
import { min } from "lodash";

const lines = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");

const seeds = lines
  .shift()!
  .substring(7)
  .split(" ")
  .map(seed => parseInt(seed));

class AocMap {
  private ranges: {
    destinationRangeStart: number;
    sourceRangeStart: number;
    rangeLength: number;
  }[] = [];

  public add(nextLine: string) {
    const [
      destinationRangeStart,
      sourceRangeStart,
      rangeLength
    ] = nextLine.split(" ").map(seed => parseInt(seed));
    this.ranges.push({
      destinationRangeStart,
      sourceRangeStart,
      rangeLength
    });
  }
  public get(sourceNumber: number) {
    for (const { sourceRangeStart, destinationRangeStart, rangeLength } of this
      .ranges) {
      const diff = sourceNumber - sourceRangeStart;
      if (diff >= 0 && diff < rangeLength) {
        return destinationRangeStart + diff;
      }
    }
    return sourceNumber;
  }
}

const maps: { [mapName: string]: AocMap } = {
  seedToSoil: new AocMap(),
  soilToFertilizer: new AocMap(),
  fertilizerToWater: new AocMap(),
  waterToLight: new AocMap(),
  lightToTemperature: new AocMap(),
  temperatureToHumidity: new AocMap(),
  humidityToLocation: new AocMap()
};

lines.shift(); // empty line

for (const mapName of Object.keys(maps)) {
  const map = maps[mapName];
  lines.shift(); // seed-to-soil map:
  let nextLine = lines.shift();
  while (nextLine) {
    map.add(nextLine);
    nextLine = lines.shift();
  }
}

const seedLocations = seeds.map(seed =>
  Object.values(maps).reduce((prev, map) => map.get(prev), seed)
);

console.log(min(seedLocations));
