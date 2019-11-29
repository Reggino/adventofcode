const {readFileSync} = require('fs');
const path = require('path');

const stream  = readFileSync(path.join(__dirname, './09/input.txt'), {encoding: 'utf-8'});

let level = 0;
let score = 0;
let isGarbage = false;
let garbageCount = 0;

for (let i = 0; i < stream.length; i++) {
    const letter = stream[i];

    switch (letter) {
        case '{':
            if (isGarbage) {
                garbageCount += 1;
                break;
            }
            level += 1;
            score += level;
            break;

        case '}':
            if (isGarbage) {
                garbageCount += 1;
                break;
            }
            level -= 1;
            break;

        case '!':
            i += 1;
            break;

        case '<':
            if (isGarbage) {
                garbageCount += 1;
                break;
            }
            isGarbage = true;
            break;

        case '>':
            isGarbage = false;
            break;

        default:
            if (isGarbage) {
                garbageCount += 1;
            }
    }
}

console.log(level, score, garbageCount);