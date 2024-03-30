import { readFileSync } from "fs";
import { join } from "path";
import { intersection, range, sum } from "lodash";

interface ICard {
  winning: number[];
  numbers: number[];
  cardId: number;
  count: number;
}

interface ICardMap {
  [cardId: number]: ICard;
}

const cardMap = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => {
    const [cardId, data] = line.trim().split(": ");
    const [winning, numbers] = data.trim().split(" | ");
    return {
      cardId: parseInt(cardId.replaceAll(/\D/g, "")),
      winning: winning.split(/ +/g).map(numberString => parseInt(numberString)),
      numbers: numbers.split(/ +/g).map(numberString => parseInt(numberString)),
      count: 1
    };
  })
  .reduce<ICardMap>((prev, card) => {
    prev[card.cardId] = card;
    return prev;
  }, {});

for (const cardId in cardMap) {
  const card = cardMap[cardId];
  const winningCardCount = intersection(card.winning, card.numbers).length;
  for (const extraIndex of range(1, winningCardCount + 1)) {
    const extraCardId = card.cardId + extraIndex;
    cardMap[extraCardId].count += card.count;
  }
}

console.log(sum(Object.values(cardMap).map(card => card.count)));
