import { readFileSync } from "fs";
import { join } from "path";
import { IntcodePc } from "./IntcodePc";

const defaultMem = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8",
})
  .trim()
  .split(",")
  .map((line) => Math.floor(parseInt(line, 10)));

class Robot {
  private pc: IntcodePc;
  private x: number = 1;
  private y: number = 1;
  private direction: "<" | "^" | ">" | "v" = "^";
  private grid = new Array(10).fill("").map(() => new Array(50).fill(2));

  constructor() {
    this.pc = new IntcodePc();
    this.pc.load(defaultMem);
    this.pc.addInput(this.grid[this.y][this.x]);
    this.pc.on("output", () => {
      if (this.pc.output.length > 1) {
        // debugger;
        console.log(this.pc.output);
        this.grid[this.y][this.x] = this.pc.output[0];
        this.move(this.pc.output[1]);
        this.pc.output = [];
        this.pc.addInput(this.grid[this.y][this.x]);
        this.log();
      }
    });
  }

  public start() {
    this.pc.run();
  }

  public log() {
    // console.log(
    //   this.grid.reduce(
    //     (rowPrev: number, row) =>
    //       rowPrev +
    //       row.reduce(
    //         (cellPrev: number, cell) => cellPrev + (cell === 2 ? 0 : 1),
    //         0
    //       ),
    //     0
    //   )
    // );

    this.grid[this.y][this.x] = this.direction;
    this.grid.forEach((row) => {
      row.forEach((val) => process.stdout.write(`${val}`));
      process.stdout.write("\n");
    });
  }

  private move(turnRight: number) {
    // 0 = turn left, 1 = turn right
    if (turnRight) {
      switch (this.direction) {
        case "<":
          this.doMove("^");
          break;

        case "^":
          this.doMove(">");
          break;

        case ">":
          this.doMove("v");
          break;

        case "v":
          this.doMove("<");
          break;
      }
      return;
    }
    switch (this.direction) {
      case "<":
        this.doMove("v");
        break;

      case "^":
        this.doMove("<");
        break;

      case ">":
        this.doMove("^");
        break;

      case "v":
        this.doMove(">");
        break;
    }
  }

  private doMove(direction: "<" | "^" | ">" | "v") {
    this.direction = direction;
    switch (direction) {
      case "<":
        this.x -= 1;
        break;

      case "^":
        this.y -= 1;
        break;

      case ">":
        this.x += 1;
        break;

      case "v":
        this.y += 1;
        break;
    }
  }
}

const robot = new Robot();
robot.start();
robot.log();

// MUST BE >250
