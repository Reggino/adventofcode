import { readFileSync } from "fs";
import * as path from "path";

interface ISkyContext {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  centerX: number;
  centerY: number;
}

interface IStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const stars: IStar[] = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(starString => {
    const starData = starString.match(
      /position=\<(.+),(.+)> velocity=<(.+),(.+)>/
    );
    if (!starData) {
      throw new Error("Huh?");
    }
    return {
      x: parseInt(starData[1].trim(), 10),
      y: parseInt(starData[2].trim(), 10),
      vx: parseInt(starData[3].trim(), 10),
      vy: parseInt(starData[4].trim(), 10)
    };
  });

function getSkyContext(): ISkyContext {
  const minX = Math.min(...stars.map(star => star.x));
  const minY = Math.min(...stars.map(star => star.y));
  const maxX = Math.max(...stars.map(star => star.y));
  const maxY = Math.max(...stars.map(star => star.y));
  return {
    minX,
    minY,
    maxX,
    maxY,
    centerX: maxX - minX,
    centerY: maxY - minY
  };
}

function getDistance() {
  const context = getSkyContext();
  return stars.reduce(
    (prev, star) =>
      prev +
      Math.abs(star.x - context.centerX) +
      Math.abs(star.y - context.centerY),
    0
  );
}

let time = 0;
let newDistance = Infinity;
let lastDistance = Infinity;

function tick() {
  stars.forEach(star => {
    star.x += star.vx;
    star.y += star.vy;
  });
  time++;
}

while (newDistance <= lastDistance) {
  tick();
  lastDistance = newDistance;
  newDistance = getDistance();
}

// wait for the stars to align properly.... (trial and error)

tick();
tick();
tick();
tick();
tick();
tick();
tick();
tick();
tick();
tick();
tick();
tick();
tick();

// yeah!

const context = getSkyContext();
const sky = new Array(context.maxY - context.minY + 1)
  .fill(".")
  .map(row => new Array(context.maxX - context.minX + 100).fill("."));
sky.forEach(row => {
  console.log(row.join(""));
});

stars.forEach(star => {
  sky[star.y - context.minY][star.x - context.minX] = "#";
});

sky.forEach(row => {
  console.log(row.join(""));
});
