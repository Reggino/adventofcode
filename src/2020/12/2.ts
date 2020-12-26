import { readFileSync } from "fs";
import { join } from "path";

interface IState {
  wpX: number;
  wpY: number;
  shipX: number;
  shipY: number;
}

const result = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .reduce<IState>(
    (prev, instruction) => {
      const value = parseInt(instruction.substr(1), 10);
      const { wpX, wpY } = prev;
      let command = instruction[0];
      const reduceResult = { ...prev };
      switch (command) {
        case "N": // means to move north by the given value.
          return {
            ...prev,
            wpY: wpY + value
          };

        case "S": // means to move south by the given value.
          return {
            ...prev,
            wpY: wpY - value
          };

        case "E": // means to move east by the given value.
          return {
            ...prev,
            wpX: wpX + value
          };

        case "W": // means to move west by the given value.
          return {
            ...prev,
            wpX: wpX - value
          };

        case "L": // means to turn left the given number of degrees.
          for (let i = 0; i < value / 90; i++) {
            const x = reduceResult.wpX;
            reduceResult.wpX = -reduceResult.wpY;
            reduceResult.wpY = x;
          }
          break;

        case "R": // means to turn right the given number of degrees.
          for (let i = 0; i < value / 90; i++) {
            const y = reduceResult.wpY;
            reduceResult.wpY = -reduceResult.wpX;
            reduceResult.wpX = y;
          }
          break;

        case "F": // means to move forward by the given value in the direction the ship is currently facing.
          for (let i = 0; i < value; i++) {
            reduceResult.shipX += wpX;
            reduceResult.shipY += wpY;
          }
          break;

        default:
          throw new Error(`Unknown instruction: ${instruction}`);
      }
      return reduceResult;
    },
    { shipX: 0, shipY: 0, wpX: 10, wpY: 1 }
  );
console.log(Math.abs(result.shipX) + Math.abs(result.shipY));
