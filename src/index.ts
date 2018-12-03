import { day1_1 } from './day-1/day-1-1';
import { day1_2 } from './day-1/day-1-2';
import { day2_1 } from './day-2/day-2-1';
import { day2_2 } from './day-2/day-2-2';
import { day3_1 } from './day-3/day-3-1';
import { day3_2 } from './day-3/day-3-2';

const args: string[] = process.argv.slice(2);
const runDay = (day: string): boolean => {
  return args.length === 0 || args.indexOf(day) !== -1;
};

if (runDay('1')) {
  console.info('Day 1 results are:', day1_1(), ',', day1_2());
}

if (runDay('2')) {
  console.info('Day 2 results are:', day2_1(), ',', day2_2());
}

if (runDay('3')) {
  console.info('Day 3 results are:', day3_1(), ',', day3_2());
}
