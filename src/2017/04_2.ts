import { readFileSync } from 'fs';
import { uniq } from 'lodash';
import { join } from 'path';

const lines = readFileSync(join(__dirname, './04/input.txt'), { encoding: 'utf-8' }).split('\n');
const noRepeats = (w, _, ws) => ws.filter(v => v === w).length === 1;
const sortLetters = w => w.split('').sort().join('');
const isValid = f => ph => ph.split(' ').map(f).every(noRepeats);
const count = f => lines.filter(isValid(f)).length;

console.log([w => w, sortLetters].map(count));