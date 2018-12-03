import { day1_1 } from './day-1/day-1-1';
import { day1_2 } from './day-1/day-1-2';
import { day2_1 } from './day-2/day-2-1';
import { day2_2 } from './day-2/day-2-2';
import { day3_1 } from './day-3/day-3-1';
import { day3_2 } from './day-3/day-3-2';

const args: string[] = process.argv.slice(2);
const runDay = (day: string, part1: Function = () => '', part2: Function = () => '') => {
  if (args.length !== 0 && args.indexOf(day) === -1) {
    return;
  }

  try {
    console.info(`Day ${day} results are: ${part1()}, ${part2()}`);
  } catch (e) {
    const error = (e as Error);
    console.error(error.message);
  }
};

runDay('1', day1_1, day1_2);

runDay('2', day2_1, day2_2);

runDay('3', day3_1, day3_2);
