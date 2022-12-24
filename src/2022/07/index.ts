import { readFileSync } from "fs";
import { join } from "path";
import { sum } from "lodash";

const lines = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n");
const cwdPathNibbles: string[] = [];

interface IDir {
  name: string;
  dirs: IDir[];
  files: Record<string, number>;
}

const rootDir: IDir = {
  name: "/",
  dirs: [],
  files: {}
};

function getDir(pathNibbles: string[]): IDir {
  let result = rootDir;
  pathNibbles.forEach(pathNibble => {
    result = result.dirs.find(dir => dir.name === pathNibble) as IDir;
  });
  return result;
}

function getDirSize(dir: IDir): number {
  let result = 0;
  dir.dirs.forEach(subDir => {
    result += getDirSize(subDir);
  });
  result += sum(Object.values(dir.files));
  return result;
}

lines.forEach(line => {
  const isInput = line.substring(0, 2) === "$ ";
  if (isInput) {
    const [command, arg] = line.substring(2).split(" ");
    switch (command) {
      case "cd":
        switch (arg) {
          case "/":
            cwdPathNibbles.length = 0;
            return;

          case "..":
            cwdPathNibbles.pop();
            return;

          default:
            cwdPathNibbles.push(arg);
            return;
        }
      // break;

      case "ls": {
        // console.log("ls", `/${cwdPathNibbles.join("/")}`);
        return;
      }
    }
    throw new Error(`Cannot process ${line}`);
  }

  // this is output, store it
  const outputParts = line.split(" ");
  const cwdDir = getDir(cwdPathNibbles);
  if (outputParts[0] === "dir") {
    cwdDir.dirs.push({
      name: outputParts[1],
      dirs: [],
      files: {}
    });
    return;
  }

  cwdDir.files[outputParts[1]] = parseInt(outputParts[0]);
});

let smallestPossibleDirSize = Number.MAX_SAFE_INTEGER;
let smallDirTotalSize = 0;
const usedSpace = getDirSize(rootDir);
const toBeDeleted = 30000000 - (70000000 - usedSpace);

const traverseDir = (dir: IDir) => {
  dir.dirs.forEach(subDir => {
    const subDirSize = getDirSize(subDir);
    if (subDirSize <= 100000) {
      smallDirTotalSize += subDirSize;
    }
    if (subDirSize >= toBeDeleted && subDirSize < smallestPossibleDirSize) {
      smallestPossibleDirSize = subDirSize;
    }

    traverseDir(subDir);
  });
};
traverseDir(rootDir);
console.log("Answer 1", smallDirTotalSize);
console.log("Answer 2", smallestPossibleDirSize);
