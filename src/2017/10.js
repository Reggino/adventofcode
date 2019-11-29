const _ = require('lodash');

const inputStr = "197,97,204,108,1,29,5,71,0,50,2,255,248,78,254,63";
function tieKnot(input, lengths, rounds = 1) {
    let result = input.slice();
    let position = 0;
    let skip = 0;

    for (let round = 0; round < rounds; round++) {
        for (let i = 0; i < lengths.length; i++) {
            let loopLength = lengths[i];
            let reversedSection = [];

            for (let at = position, x = 0; x < loopLength; x++) {
                at = (position + x) % result.length;
                reversedSection.unshift(result[at]);
            }

            for (let at = position, x = 0; x < loopLength; x++) {
                at = (position + x) % result.length;
                result[at] = reversedSection[x];
            }

            position = (position + loopLength + skip) % result.length;
            skip++;
        }
    }

    return result;
}

function getDenseHash(sparseHash) {
    let result = [];

    for (let blockNr = 0; blockNr < 16; blockNr++) {
        let block = sparseHash.slice(blockNr * 16, (blockNr + 1) * 16);
        result[blockNr] = block.reduce((a,b) => a ^ b);
    }

    return result;
}

function getHexForArray(denseHash) {
    return denseHash
        .map(digit => ("0" + digit.toString(16)).substr(-2))
        .join("");
}

let data = { list: _.range(0,256), lengths: "197,97,204,108,1,29,5,71,0,50,2,255,248,78,254,63" };
let lengths = data.lengths.split(",").map(c => parseInt(c, 10));
let knot = tieKnot(data.list, lengths);
console.log(knot[0] * knot[1]);

data = { list: _.range(0,256), lengths: "197,97,204,108,1,29,5,71,0,50,2,255,248,78,254,63" };
let position = 0;
let skip = 0;
let input = data.list || _.range(0,256);
lengths = data.lengths.split("").map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23]);

knot = tieKnot(input, lengths, 64);

console.log(getHexForArray(getDenseHash(knot)));



