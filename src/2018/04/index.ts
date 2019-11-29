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

const sleepingMinutes: { [guardId: number]: { [minute: number]: number } } = {};
Object.keys(clockRegister).forEach(date => {
  clockRegister[date].forEach((minuteGuard, minute) => {
    if (minuteGuard >= 0) {
      return;
    }
    if (!sleepingMinutes[-minuteGuard]) {
      sleepingMinutes[-minuteGuard] = {};
    }
    if (!sleepingMinutes[-minuteGuard][minute]) {
      sleepingMinutes[-minuteGuard][minute] = 1;
      return;
    }
    sleepingMinutes[-minuteGuard][minute]++;
  });
});

const mostSleepAtMinuteValue = Math.max(
  ...Object.values(sleepingMinutes[mostSleepGuardId])
);
const mostSleepAtMinuteIndex = Object.values(
  sleepingMinutes[mostSleepGuardId]
).indexOf(mostSleepAtMinuteValue);
const mostSleepAtMinute: number = parseInt(
  Object.keys(sleepingMinutes[mostSleepGuardId])[mostSleepAtMinuteIndex],
  10
);

console.log(`Most sleepy minute: ${mostSleepAtMinute}`);
console.log(`Answer1 should be: ${mostSleepGuardId * mostSleepAtMinute}`);

let mostSleepyMinuteOverallValue = 0;
let mostSleepyMinuteOverallGuardId = 0;
let mostSleepyMinuteOverallMinute = 0;
Object.keys(sleepingMinutes).forEach(guardId => {
  const sleepingMinutesMinuteValues = sleepingMinutes[guardId];
  Object.keys(sleepingMinutesMinuteValues).forEach(minute => {
    const value = sleepingMinutesMinuteValues[minute];
    if (value > mostSleepyMinuteOverallValue) {
      mostSleepyMinuteOverallValue = value;
      mostSleepyMinuteOverallGuardId = parseInt(guardId, 10);
      mostSleepyMinuteOverallMinute = parseInt(minute, 10);
    }
  });
});

console.log(
  `Most sleepy overall: guard ${mostSleepyMinuteOverallGuardId} at minute ${mostSleepyMinuteOverallMinute} (${mostSleepyMinuteOverallValue})`
);
console.log(
  `Answer2 should be: ${mostSleepyMinuteOverallGuardId *
    mostSleepyMinuteOverallMinute}`
);
