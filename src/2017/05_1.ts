import { readFileSync } from 'fs';
import { join } from 'path';

const instructions = readFileSync(join(__dirname, './05/input.txt'), { encoding: 'utf-8' }).split('\n').map(number => parseInt(number, 10));
//const instructions = [0,3,0,1,-3];

let pointer = 0;
let step = 0;

while ((pointer >= 0) && (pointer <= instructions.length)) {
    let lastPointer = pointer;
    pointer += instructions[pointer];
    instructions[lastPointer]++;
    step++;
}
console.log(step - 1);