const inputStart = 256310;
const inputEnd = 732736;

function isValid(pass: number) {
  // Two adjacent digits are the same (like 22 in 122345)
  let hasAdjacentDigits = false;
  let isIncreasing = true;
  let lastDigit = "";
  `${pass}`.split("").forEach(digit => {
    if (digit === lastDigit) {
      hasAdjacentDigits = true;
    }
    if (digit < lastDigit) {
      isIncreasing = false;
    }
    lastDigit = digit;
  });
  return hasAdjacentDigits && isIncreasing;
}

let validPasswordCount = 0;
for (let i = inputStart; i < inputEnd; i++) {
  if (isValid(i)) {
    validPasswordCount++;
  }
}

console.log(`${validPasswordCount}`);
