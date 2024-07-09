import { readFileSync } from "fs";
import { join } from "path";

const lines = readFileSync(join(__dirname, "./04/input.txt"), {
  encoding: "utf-8",
}).split("\n");
const noRepeats = (w: any, _: any, ws: any) =>
  ws.filter((v: any) => v === w).length === 1;
const sortLetters = (w: string) => w.split("").sort().join("");
const isValid = (f: any) => (ph: string) =>
  ph.split(" ").map(f).every(noRepeats);
const count = (f: any) => lines.filter(isValid(f)).length;

console.log([(w: any) => w, sortLetters].map(count));
