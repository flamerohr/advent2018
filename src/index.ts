import { day1_1 } from './day1/day1-1';
import { day1_2 } from './day1/day1-2';
import { day2_1 } from './day2/day2-1';
import { day2_2 } from './day2/day2-2';
import { day3_1 } from './day3/day3-1';
import { day3_2 } from './day3/day3-2';
import { day4_1 } from './day4/day4-1';
import { day4_2 } from './day4/day4-2';
import { day5_1 } from './day5/day5-1';
import { day5_2 } from './day5/day5-2';

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

runDay('4', day4_1, day4_2);

runDay('5', day5_1, day5_2);
