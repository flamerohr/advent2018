import { guardSleep } from './guard-sleep';

export interface MostSleptGuard {
  count: number;
  id: number;
}

export interface SleepyGuardMinute {
  count: number;
  minute: number;
}

export const day4_1 = (): number => {
  const { id }: MostSleptGuard = guardSleep
    .map((times) => {
      return times.reduce((prev, count) => prev + count, 0);
    })
    .reduce(
      (prev, count, id) => {
        return (prev.count > count) ? prev : { count, id };
      },
      { count: 0, id: 0 },
    );

  const { minute }: SleepyGuardMinute = guardSleep[id]
    .reduce(
      (prev, count, minute) => {
        return (prev.count > count) ? prev : { count, minute };
      },
      { count: 0, minute: 0 },
    );

  return id * minute;
};
