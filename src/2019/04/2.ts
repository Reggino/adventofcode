const inputStart = 256310;
const inputEnd = 732736;

function isValid(pass: number) {
  // Two adjacent digits are the same (like 22 in 122345)
  const passAsString = `${pass}`;
  let lastDigitAsString = "";

  for (let i = 0; i <= passAsString.length; i++) {
    const digitAsString = passAsString[i];
    if (digitAsString < lastDigitAsString) {
      return false;
    }
    lastDigitAsString = digitAsString;
  }

  for (let j = 0; j <= 9; j++) {
    if (passAsString.match(new RegExp(`([^${j}]|^)${j}${j}([^${j}]|$)`))) {
      return true;
    }
  }
  return false;
}

let validPasswordCount = 0;
for (let i = inputStart; i <= inputEnd; i++) {
  if (isValid(i)) {
    validPasswordCount++;
  }
}

console.log(`${validPasswordCount}`);
