import { readFileSync } from "fs";
import { join } from "path";
import { intersection } from "lodash";

interface ICard {
  winning: number[];
  numbers: number[];
  cardId: string;
}

const cards: ICard[] = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => {
    const [cardId, data] = line.trim().split(": ");
    const [winning, numbers] = data.trim().split(" | ");
    return {
      cardId,
      winning: winning.split(/ +/g).map(numberString => parseInt(numberString)),
      numbers: numbers.split(/ +/g).map(numberString => parseInt(numberString))
    };
  });

function getCardScore(card: ICard) {
  const intersectionLength = intersection(card.winning, card.numbers).length;
  return intersectionLength ? Math.pow(2, intersectionLength - 1) : 0;
}

console.log(cards.reduce((prev, card) => prev + getCardScore(card), 0));
