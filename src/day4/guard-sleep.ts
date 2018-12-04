import { schedule } from './schedule';

export interface Guard extends Array<number> {}

const parser = /\[\d+-\d+-\d+ \d+:(\d+)\] .* #?(\d+|up|asleep)/;

const sortedSchedule = schedule.sort();

const buildGuardsList = (): Guard[] => {
  const guards: Guard[] = [];
  let guardId: number = 0;
  let start: number = 0;

  sortedSchedule.forEach((description) => {
    const parts = description.match(parser);
    if (!parts) {
      return;
    }
    const time = Number(parts[1]);
    const action = parts[2];
    const id = Number(action);

    if (!Number.isNaN(id)) {
      guardId = id;
    }
    if (action === 'asleep') {
      start = time;
    }
    if (action === 'up') {
      for (let minute = start; minute < time; minute += 1) {
        if (!guards[guardId]) {
          guards[guardId] = [];
        }
        if (!guards[guardId][minute]) {
          guards[guardId][minute] = 0;
        }
        guards[guardId][minute] += 1;
      }
    }
  });

  return guards;
};

export const guardSleep: Guard[] = buildGuardsList();
