import { readFileSync } from "fs";
import { join } from "path";

const numbers: number[] = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => parseInt(line, 10))
  .sort((a, b) => (a < b ? -1 : 1));

const diffs: { [diff: number]: number } = { 1: 0, 2: 0, 3: 1 }; // 1 is for the default +3 output

numbers.forEach((number, index) => {
  diffs[number - (numbers[index - 1] || 0)] += 1;
});

function getCombinationPerLength(lst: any, length: any): number[][] {
  //getCombinationPerLength([1,2,3], 2)
  //[[1,2], [1,3], [2,3]]

  let combinations: any = [];
  if (length == 1) {
    lst.forEach((item: any) => {
      combinations.push([item]);
    });
  } else {
    for (let i = 0; i < lst.length; i++) {
      let combinationsLength = getCombinationPerLength(
        lst.slice(i + 1, lst.length),
        length - 1
      );
      combinationsLength.forEach(c => {
        c.push(lst[i]);
        combinations.push(c);
      });
    }
  }
  return combinations;
}

function getCombinationsUptoLength(lst: number[]): number[][] {
  //getCombinationsUptoLength([1,2,3])
  //[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]

  let combinations: any = []; //include empty
  for (let i = 1; i <= lst.length; i++) {
    let combinationsOneLength = getCombinationPerLength(lst, i);
    combinations = combinations.concat(combinationsOneLength);
  }

  return combinations;
}

function chainCorrect(input: number[]): boolean {
  let joltage = 0;

  for (let i = 0; i < input.length; i++) {
    const adapter = input[i];

    if (adapter == undefined) {
      continue;
    }
    if (adapter - joltage > 3) {
      return false;
    }
    joltage = adapter;
  }
  return true;
}

function part2(input: number[]) {
  input.push(0);
  let sorted = input.sort(function(a, b) {
    return a - b;
  });

  let total = [];
  let temp = [];
  for (let i = 0; i < sorted.length - 2; i++) {
    const current = sorted[i];
    const nextnext = sorted[i + 2];

    if (nextnext - current <= 3) {
      //next can be removed
      temp.push(i + 1);
    } else {
      //next cannot be removed
      if (temp.length != 0) {
        total.push(temp);
        temp = [];
      }
    }
  }
  if (temp.length != 0) {
    total.push(temp);
    temp = [];
  }

  let counts: number[] = [];
  total.forEach(group => {
    let count = 1; //this is for the empty list
    let combinations = getCombinationsUptoLength(group);

    combinations.forEach(combination => {
      // console.log("combination", combination)
      let clonedSorted = [...sorted];
      combination.forEach(index => {
        delete clonedSorted[index];
      });
      if (chainCorrect(clonedSorted)) {
        count++;
      }
    });

    counts.push(count);
  });

  let returnTotal = 1;
  counts.forEach(count => {
    returnTotal *= count;
  });

  return returnTotal;
}

console.log(part2(numbers));
