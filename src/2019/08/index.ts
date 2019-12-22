import { readFileSync } from "fs";
import { join } from "path";

const digits = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("")
  .map(digit => Math.floor(parseInt(digit, 10)));

interface ILayer {
  digits: number[];
  count0: number;
  count1: number;
  count2: number;
}
const layers: ILayer[] = [];

while (digits.length) {
  const layerDigits = digits.splice(0, 150);
  layers.push({
    digits: layerDigits,
    count0: layerDigits.filter(digit => digit === 0).length,
    count1: layerDigits.filter(digit => digit === 1).length,
    count2: layerDigits.filter(digit => digit === 2).length
  });
}

const minCount0 = layers.reduce(
  (prev: number, layer: ILayer) => Math.min(prev, layer.count0),
  999
);
const minCount0Layer = layers.find(
  layer => layer.count0 === minCount0
) as ILayer;

// not 2809
// not 81
console.log(minCount0Layer.count1 * minCount0Layer.count2);

// 0 black
// 1 white
// 2 trans

const finalImage = layers.reduce((prev, layer) => {
  layer.digits.forEach((digit, pos) => {
    if (digit !== 2 && prev[pos] === 2) {
      prev[pos] = digit;
    }
  });
  return prev;
}, new Array(150).fill(2));

for (let y = 0; y < 6; y++) {
  for (let x = 0; x < 25; x++) {
    process.stdout.write(`${finalImage[y * 25 + x] ? "■" : " "}`);
  }
  process.stdout.write("\n");
}
