import { readFileSync } from "fs";
import { join } from "path";

const commandMap = {
  0: "N",
  90: "E",
  180: "S",
  270: "W",
};

const result = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8",
})
  .trim()
  .split("\n")
  .reduce(
    (prev, instruction) => {
      const value = parseInt(instruction.substr(1), 10);
      const { x, y, orientation } = prev;
      let command = instruction[0];

      if (command === "F") {
        let normalizedOrientation = orientation;
        while (normalizedOrientation < 0) {
          normalizedOrientation += 360;
        }
        // @expect-error todo
        command = commandMap[normalizedOrientation % 360];
        if (!command) {
          throw new Error(`Failed to map: ${normalizedOrientation % 360}`);
        }
      }

      switch (command) {
        case "N": // means to move north by the given value.
          return {
            ...prev,
            y: y + value,
          };

        case "S": // means to move south by the given value.
          return {
            ...prev,
            y: y - value,
          };

        case "E": // means to move east by the given value.
          return {
            ...prev,
            x: x + value,
          };

        case "W": // means to move west by the given value.
          return {
            ...prev,
            x: x - value,
          };

        case "L": // means to turn left the given number of degrees.
          return {
            ...prev,
            orientation: orientation - value,
          };

        case "R": // means to turn right the given number of degrees.
          return {
            ...prev,
            orientation: orientation + value,
          };

        case "F": // means to move forward by the given value in the direction the ship is currently facing.
          break;

        default:
          throw new Error(`Unknown instruction: ${instruction}`);
      }
      return prev;
    },
    { x: 0, y: 0, orientation: 90 },
  );
console.log(Math.abs(result.x) + Math.abs(result.y));
