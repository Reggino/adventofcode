import { readFileSync } from "fs";
import * as moment from "moment";
import * as path from "path";

const strings = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .split("\n")
  .filter(string => !!string);

const hash = {};

strings.forEach(string => {
  const parsedString = /\[(\d+-\d+-\d+ \d+:\d+)] (.+)$/g.exec(string);
  if (parsedString) {
    hash[parsedString[1]] = parsedString[2];
  }
});

const pointer = moment("1518-02-22 22:00");
const clockRegister = {};
let guardId = 0;

while (pointer.isBefore("1518-11-24 00:01")) {
  const hour = pointer.hour();
  const minute = pointer.minute();
  const event = hash[pointer.format("YYYY-MM-DD HH:mm")];
  if (event) {
    if (event.startsWith("Guard #")) {
      guardId = parseInt(event.replace(/\D/g, ""));
    }
    if (event.startsWith("falls asleep")) {
      guardId *= -1;
    }
    if (event.startsWith("wakes up")) {
      guardId *= -1;
    }
  }

  if (hour === 2 && minute === 0) {
    guardId = 0;
  }

  if (hour === 0) {
    if (minute === 0) {
      clockRegister[pointer.format("YYYY-MM-DD")] = [guardId];
    } else {
      clockRegister[pointer.format("YYYY-MM-DD")].push(guardId);
    }
  }

  pointer.add(1, "minute");
}

const guardSleepCount: { [guardId: number]: number } = {};
Object.keys(clockRegister).forEach(date => {
  clockRegister[date].forEach(minuteGuard => {
    if (minuteGuard >= 0) {
      return;
    }
    if (!guardSleepCount[-minuteGuard]) {
      guardSleepCount[-minuteGuard] = 1;
      return;
    }
    guardSleepCount[-minuteGuard]++;
  });
});
const mostSleep = Math.max(...Object.values(guardSleepCount));
const mostSleepIndex = Object.values(guardSleepCount).indexOf(mostSleep);
const mostSleepGuardId: number = parseInt(
  Object.keys(guardSleepCount)[mostSleepIndex],
  10
);

console.log(`GuardId with most sleeping minutes: ${mostSleepGuardId}`);

const sleepingMinutes: { [minute: number]: number } = {};
Object.keys(clockRegister).forEach(date => {
  clockRegister[date].forEach((minuteGuard, minute) => {
    if (minuteGuard === -mostSleepGuardId) {
      if (!sleepingMinutes[minute]) {
        sleepingMinutes[minute] = 1;
        return;
      }
      sleepingMinutes[minute]++;
    }
  });
});

const mostSleepAtMinuteValue = Math.max(...Object.values(sleepingMinutes));
const mostSleepAtMinuteIndex = Object.values(sleepingMinutes).indexOf(
  mostSleepAtMinuteValue
);
const mostSleepAtMinute: number = parseInt(
  Object.keys(sleepingMinutes)[mostSleepAtMinuteIndex],
  10
);

console.log(`Most sleepy minute: ${mostSleepAtMinute}`);
console.log(`Answer should be: ${mostSleepGuardId * mostSleepAtMinute}`);
