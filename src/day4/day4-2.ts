import { guardSleep } from './guard-sleep';

export const day4_2 = (): number => {
  let guardId = 0;
  let mostMinute = 0;
  let mostTimes = 0;

  guardSleep.forEach((minutes, id) => {
    minutes.forEach((times, minute) => {
      if (times > mostTimes) {
        mostTimes = times;
        guardId = id;
        mostMinute = minute;
      }
    });
  });

  return guardId * mostMinute;
};
