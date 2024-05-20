import { readFileSync } from "fs";
import { join } from "path";
import { invert, uniq } from "lodash";

const cardValues = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
};

type TCard = keyof typeof cardValues;

enum EHandType {
  FIVE_OF_A_KIND = "FIVE_OF_A_KIND",
  FOUR_OF_A_KIND = "FOUR_OF_A_KIND",
  FULL_HOUSE = "FULL_HOUSE",
  THREE_OF_A_KIND = "THREE_OF_A_KIND",
  TWO_PAIR = "TWO_PAIR",
  ONE_PAIR = "ONE_PAIR",
  HIGH_CARD = "HIGH_CARD"
}

const handTypeValues = invert(Object.values(EHandType));

function getHandType(cards: TCard[]): EHandType {
  const uniqueLength = uniq(cards).length;

  switch (uniqueLength) {
    case 1:
      return EHandType.FIVE_OF_A_KIND;

    case 2:
      return [1, 4].includes(cards.filter(card => card === cards[0]).length)
        ? EHandType.FOUR_OF_A_KIND
        : EHandType.FULL_HOUSE;

    case 3:
      for (let i = 0; i <= 3; i++) {
        const duplicateCardCount = cards.filter(card => card === cards[i])
          .length;
        if (duplicateCardCount === 2) {
          return EHandType.TWO_PAIR;
        }
        if (duplicateCardCount === 3) {
          return EHandType.THREE_OF_A_KIND;
        }
      }
      throw new Error("Should not happen");

    case 4:
      return EHandType.ONE_PAIR;

    default:
      return EHandType.HIGH_CARD;
  }
}

const hands = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => {
    const [cardsString, bid] = line.split(" ");
    const cards = cardsString.split("") as TCard[];
    return {
      cards,
      bid: parseInt(bid),
      type: getHandType(cards)
    };
  });

console.log(
  hands
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
      // return 0; ??
    })
    .reverse()
    .reduce((prev, hand, handIndex) => {
      return prev + (handIndex + 1) * hand.bid;
    }, 0)
);

// 247823654;
// 248121254 = too high
