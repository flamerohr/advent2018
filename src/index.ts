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
import { day6_1 } from './day6/day6-1';
import { day6_2 } from './day6/day6-2';
import { day7_1 } from './day7/day7-1';
import { day7_2 } from './day7/day7-2';
import { day8_1 } from './day8/day8-1';
import { day8_2 } from './day8/day8-2';
import { day9_1 } from './day9/day9-1';
import { day9_2 } from './day9/day9-2';
import { day10_1 } from './day10/day10-1';
import { day11_1 } from './day11/day11-1';
import { day11_2 } from './day11/day11-2';

const args: string[] = process.argv.slice(2);
const runDay = (day: string, part1: Function = () => '', part2: Function = () => '') => {
  if (args.length !== 0 && args.indexOf(day) === -1) {
    return;
  }

  try {
    if (args.length !== 0) {
      console.time('Day runtime');
    }
    console.info(`Day ${day} results are: ${part1()}, ${part2()}`);
    if (args.length !== 0) {
      console.timeEnd('Day runtime');
    }
  } catch (e) {
    const error = (e as Error);
    console.error(error.message);
  }
};

if (args.length === 0) {
  console.time('App runtime');
}
runDay('1', day1_1, day1_2);

runDay('2', day2_1, day2_2);

runDay('3', day3_1, day3_2);

runDay('4', day4_1, day4_2);

runDay('5', day5_1, day5_2);

runDay('6', day6_1, day6_2);

runDay('7', day7_1, day7_2);

runDay('8', day8_1, day8_2);

runDay('9', day9_1, day9_2);

runDay('10', day10_1);

runDay('11', day11_1, day11_2);

if (args.length === 0) {
  console.timeEnd('App runtime');
}
