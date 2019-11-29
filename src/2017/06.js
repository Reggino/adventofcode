const state = [4, 10, 4, 1, 8, 4, 9, 14, 5, 1, 14, 15, 0, 15, 3, 5];

const configurations = {};
let iterationCount = 0;

while (!configurations[JSON.stringify(state)]) {
    iterationCount++;
    configurations[JSON.stringify(state)] = iterationCount;
    let stateHigh = Math.max(...state);
    let statePointer = state.findIndex(val => val === stateHigh);
    state[statePointer] = 0;
    statePointer = (statePointer === (state.length - 1)) ? 0 : statePointer + 1;
    while (stateHigh > 0) {
        state[statePointer] += 1;
        statePointer = (statePointer === (state.length - 1)) ? 0 : statePointer + 1;
        stateHigh -= 1;
    }
}

console.log(1, Object.keys(configurations).length);
console.log(2, Object.keys(configurations).length - configurations[JSON.stringify(state)] + 1);