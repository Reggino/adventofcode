import { readFileSync } from "fs";
import { join } from "path";

type TCard = number[][];

const lines = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => line.trim());

const draws = (lines.shift() as string)
  .split(",")
  .map(digit => parseInt(digit, 10));

const cards: TCard[] = [];
let card: TCard;
lines.forEach(line => {
  if (!line) {
    if (card) {
      cards.push(card);
    }
    card = [];
    return;
  }
  card.push(line.split(/ +/).map(digit => parseInt(digit, 10)));
});

draws.forEach(draw => {
  console.log(`Processing ${draw}`);
  cards.forEach(card => {
    card.forEach(row => {
      row.forEach((cell, key) => {
        if (cell === draw) {
          row[key] = 0;
        }
      });
    });
  });

  const winningCard = cards.find(card => {
    let colIndex;
    let rowIndex;

    // check rows
    for (rowIndex = 0; rowIndex < 5; rowIndex++) {
      const rowSum = card[rowIndex].reduce((rowSum, cell) => rowSum + cell, 0);
      if (!rowSum) {
        return true;
      }
    }

    for (colIndex = 0; colIndex < 5; colIndex++) {
      let colSum = 0;
      for (rowIndex = 0; rowIndex < 5; rowIndex++) {
        colSum += card[rowIndex][colIndex];
      }
      if (!colSum) {
        return true;
      }
    }

    return false;
  });

  if (winningCard) {
    const cardSum = winningCard.reduce(
      (cardSum, row) =>
        cardSum + row.reduce((rowSum, cell) => rowSum + cell, 0),
      0
    );
    console.log(`${cardSum} * ${draw} = ${cardSum * draw}`);
    process.exit(0);
  }
});

// console.log(JSON.stringify({ draws, cards }, null, "\t"));
