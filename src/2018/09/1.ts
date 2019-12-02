const input = "476 players; last marble is worth 71431 points";

const playerScores = new Array(476).fill(0);
const stack = [0, 1];
let currentPlayerIndex = 1;
let currentStackIndex = 1;

for (let marble = 2; marble <= 71431; marble++) {
  currentPlayerIndex++;
  if (currentPlayerIndex >= playerScores.length) {
    currentPlayerIndex = 0;
  }
  currentStackIndex += 2;
  if (currentStackIndex > stack.length) {
    currentStackIndex -= stack.length;
  }

  if (marble % 23 === 0) {
    playerScores[currentPlayerIndex] += marble;
    currentStackIndex -= 9;
    if (currentStackIndex < 0) {
      currentStackIndex = stack.length + currentStackIndex;
    }
    playerScores[currentPlayerIndex] += stack.splice(currentStackIndex, 1)[0];
  } else {
    stack.splice(currentStackIndex, 0, marble);
  }
}

console.log(Math.max(...playerScores));
