import { readFileSync } from "fs";
import { join } from "path";

const passports = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n\n")
  .map(line =>
    line
      .replace(/\n/g, " ")
      .trim()
      .split(" ")
      .reduce((prev, piece) => {
        const pieceData = piece.split(":");
        // @ts-ignore
        prev[pieceData[0]] = pieceData[1];
        return prev;
      }, {})
  );

const isValid1 = (passport: any) => {
  let valid = true;
  ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].forEach(requiredProp => {
    if (!passport[requiredProp]) {
      valid = false;
    }
  });
  return valid;
};

const isValid2 = (passport: any) => {
  const byr = parseInt(passport.byr, 10);
  if (isNaN(byr) || byr < 1920 || byr > 2002) {
    return false;
  }

  const iyr = parseInt(passport.iyr, 10);
  if (isNaN(iyr) || iyr < 2010 || iyr > 2020) {
    return false;
  }
  const eyr = parseInt(passport.eyr, 10);
  if (isNaN(eyr) || eyr < 2020 || eyr > 2030) {
    return false;
  }

  const hgt = /^(\d+)((cm)|(in))$/.exec(passport.hgt);
  if (!hgt) {
    return false;
  }
  const hgtVal = parseInt(hgt[1], 10);
  switch (hgt[2]) {
    case "cm":
      if (hgtVal < 150 || hgtVal > 193) {
        return false;
      }
      break;

    case "in":
      if (hgtVal < 59 || hgtVal > 76) {
        return false;
      }
      break;
  }
  const hcl = /^#[0-9a-f]{6}$/.exec(passport.hcl);
  if (!hcl) {
    return false;
  }
  if (
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(passport.ecl) ===
    -1
  ) {
    return false;
  }
  const pid = /^\d{9}$/.exec(passport.pid);
  return !!pid;
};

console.log(passports.filter(isValid1).length);
console.log(passports.filter(isValid2).length);

// too high 145
