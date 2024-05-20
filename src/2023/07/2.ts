import { readFileSync } from "fs";
import { join } from "path";
import { invert, uniq } from "lodash";

const cardValues = {
  J: 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  Q: 12,
  K: 13,
  A: 14,
};

type TCard = keyof typeof cardValues;

export enum EHandType {
  FIVE_OF_A_KIND = "FIVE_OF_A_KIND",
  FOUR_OF_A_KIND = "FOUR_OF_A_KIND",
  FULL_HOUSE = "FULL_HOUSE",
  THREE_OF_A_KIND = "THREE_OF_A_KIND",
  TWO_PAIR = "TWO_PAIR",
  ONE_PAIR = "ONE_PAIR",
  HIGH_CARD = "HIGH_CARD",
}

const handTypeValues = invert(Object.values(EHandType));

function getHandType(cards: TCard[]): EHandType {
  const uniqueLength = uniq(cards).filter((card) => card !== "J").length;

  switch (uniqueLength) {
    case 0:
    case 1:
      return EHandType.FIVE_OF_A_KIND;

    case 2:
      for (let i = 0; i <= 3; i++) {
        const duplicateCardCount = cards.filter(
          (card) => card === cards[i] || card === "J",
        ).length;
        if (duplicateCardCount === 4) {
          return EHandType.FOUR_OF_A_KIND;
        }
      }
      return EHandType.FULL_HOUSE;

    case 3:
      for (let i = 0; i <= 3; i++) {
        const duplicateCardCount = cards.filter(
          (card) => card === cards[i] || card === "J",
        ).length;
        if (duplicateCardCount === 3) {
          return EHandType.THREE_OF_A_KIND;
        }
      }
      return EHandType.TWO_PAIR;

    case 4:
      return EHandType.ONE_PAIR;

    default:
      return EHandType.HIGH_CARD;
  }
}

export const hands = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8",
})
  .trim()
  .split("\n")
  .map((line) => {
    const [cardsString, bid] = line.split(" ");
    const cards = cardsString.split("") as TCard[];
    return {
      cards,
      bid: parseInt(bid),
      type: getHandType(cards),
    };
  })
  .sort((handA, handB) => {
    if (handA.type !== handB.type) {
      return handTypeValues[handA.type] < handTypeValues[handB.type] ? -1 : 1;
    }
    let cardPointer = 0;
    while (cardPointer < handA.cards.length) {
      const cardAValue = cardValues[handA.cards[cardPointer]];
      const cardBValue = cardValues[handB.cards[cardPointer]];
      if (cardAValue !== cardBValue) {
        return cardAValue < cardBValue ? 1 : -1;
      }
      cardPointer++;
    }
    throw new Error("Should not happen");
  })
  .reverse();

console.log(
  hands.reduce((prev, hand, handIndex) => {
    return prev + (handIndex + 1) * hand.bid;
  }, 0),
);
