const {readFileSync} = require('fs');
const path = require('path');

const instructions = readFileSync(path.join(__dirname, './08/input.txt'), {encoding: 'utf-8'}).split('\n').map(row => {
    const instructionInfo = row.split(' ');
    return {
        register: instructionInfo[0],
        operation: instructionInfo[1],
        value: parseInt(instructionInfo[2], 10),
        ifRegister: instructionInfo[4],
        ifOperator: instructionInfo[5],
        ifValue: parseInt(instructionInfo[6], 10)
    };
});

const registers = {};
let highValue = 0;

instructions.forEach(instruction => {
    const ifRegisterValue = registers[instruction.ifRegister] || 0;
    let doExecute;

    switch (instruction.ifOperator) {
        case '>':
            doExecute = (ifRegisterValue > instruction.ifValue);
            break;

        case '<':
            doExecute = (ifRegisterValue < instruction.ifValue);
            break;

        case '>=':
            doExecute = (ifRegisterValue >= instruction.ifValue);
            break;

        case '==':
            doExecute = (ifRegisterValue === instruction.ifValue);
            break;

        case '<=':
            doExecute = (ifRegisterValue <= instruction.ifValue);
            break;

        case '!=':
            doExecute = (ifRegisterValue !== instruction.ifValue);
            break;

        default:
            throw new Error('Unknown ifOperator', instruction);
    }

    if (!doExecute) {
        return;
    }

    const targetRegisterValue = registers[instruction.register] || 0;

    switch (instruction.operation) {
        case 'inc':
            registers[instruction.register] = targetRegisterValue + instruction.value;
            highValue = Math.max(registers[instruction.register], highValue);
            break;

        case 'dec':
            registers[instruction.register] = targetRegisterValue - instruction.value;
            break
    }
});

console.log(Math.max(...Object.values(registers)), highValue);