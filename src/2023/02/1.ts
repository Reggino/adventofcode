import { readFileSync } from "fs";
import { join } from "path";
import { sum } from "lodash";

interface IGame {
  green?: number;
  red?: number;
  blue?: number;
}

const gamesPerRounds = readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split("\n")
  .map(line => {
    const [gameId, gameData] = line.split(":");
    const games = gameData
      .trim()
      .split("; ")
      .map(gameData =>
        gameData.split(", ").reduce((prev: IGame, numberAndColor) => {
          const [number, color] = numberAndColor.split(" ");
          prev[color as keyof IGame] = parseInt(number);
          return prev;
        }, {})
      );

    return { gameId: parseInt(gameId.substring(5)), games };
  });

console.log(
  sum(
    gamesPerRounds
      .filter(
        ({ games }) =>
          !games.find(
            game => game.red! > 12 || game.green! > 13 || game.blue! > 14
          )
      )
      .map(gamesPerRound => gamesPerRound.gameId)
  )
);
