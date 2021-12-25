import {readFileSync} from "fs";
import {join} from "path";

const positions = readFileSync(join(__dirname, "./input.txt"), {
    encoding: "utf-8"
})
    .trim()
    .split(",")
    .reduce<number[]>(
        (prev, position) => [...prev, parseInt(position, 10)],
        []
    );

let lowGasUsage = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < Math.max(...positions); i++) {
    const gasUsage = positions.reduce((prev, position) => prev + Math.abs(position - i), 0)
    if (gasUsage < lowGasUsage) {
        lowGasUsage = gasUsage;
    }
}

console.log(lowGasUsage)

