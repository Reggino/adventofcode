import { Deque } from "@blakeembrey/deque";

const playerScores = new Array(476).fill(0);
const deque = new Deque([0, 1]);
let currentPlayerIndex = 1;

for (let marble = 2; marble <= 7143100; marble++) {
  currentPlayerIndex++;
  if (currentPlayerIndex >= playerScores.length) {
    currentPlayerIndex = 0;
  }

  if (marble % 23 === 0) {
    playerScores[currentPlayerIndex] += marble;
    deque.rotate(-7);
    playerScores[currentPlayerIndex] += deque.pop();
  } else {
    deque.rotate(2);
    deque.push(marble);
  }
}

console.log(Math.max(...playerScores));
