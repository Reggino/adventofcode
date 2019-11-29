const { readFileSync } = require('fs');
const path = require('path');

const discs = readFileSync(path.join(__dirname, './07/input.txt'), { encoding: 'utf-8' }).split('\n').map(discInfo => {
    let discData = discInfo.split(' (');
    const name  = discData.shift();
    discData = discData[0].split(')');
    const weight = parseInt(discData.shift(), 10);
    const childNames = (discData[0] ? discData[0].substr(4).split(', ') : []);
    return { name, weight, childNames };
});

// decorate all discs with their parent and children...
discs.forEach(disc => {
    disc.parent = discs.find(otherDisc => otherDisc.childNames.indexOf(disc.name) >= 0);
    disc.children = disc.childNames.map(childName => discs.find(otherDisc => otherDisc.name === childName));
});

const rootDisc = discs.find(disc => !disc.parent);
console.log('1. root:', rootDisc.name);

function weigh(disc) {
    return disc.weight + disc.children.reduce((prev, childDisc) => prev + weigh(childDisc), 0);
}

console.log(rootDisc.children.map(childDisc => childDisc.name));
console.log(rootDisc.children.map(weigh));

let problemDisc = discs.find(disc => disc.name === 'qwada');
console.log(problemDisc.children.map(childDisc => childDisc.name));
console.log(problemDisc.children.map(weigh));
console.log(problemDisc.weight - 6);

problemDisc = discs.find(disc => disc.name === 'pkowhq');
console.log(problemDisc.children.map(childDisc => childDisc.name));
console.log(problemDisc.children.map(weigh));

problemDisc = discs.find(disc => disc.name === 'tlskukk');
console.log(problemDisc.children.map(childDisc => childDisc.name));
console.log(problemDisc.children.map(weigh));
console.log(problemDisc.weight - 6);