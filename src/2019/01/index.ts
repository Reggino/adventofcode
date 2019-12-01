import { readFileSync } from "fs";
import { join } from "path";

console.log(
  readFileSync(join(__dirname, "./input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map(line => Math.floor(parseInt(line, 10) / 3) - 2)
    .reduce((prev, val) => prev + val, 0)
);

let fuelRequirement = 0;

readFileSync(join(__dirname, "./input.txt"), { encoding: "utf-8" })
  .trim()
  .split("\n")
  .map(line => parseInt(line, 10))
  .forEach(moduleWeight => {
    let extraFuelRequirement = Math.floor(moduleWeight / 3 - 2);
    while (extraFuelRequirement > 0) {
      fuelRequirement += extraFuelRequirement;
      extraFuelRequirement = Math.floor(extraFuelRequirement / 3 - 2);
    }
  });

console.log(fuelRequirement);
