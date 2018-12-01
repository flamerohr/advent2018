import { day1_1 } from './day-1/day-1-1';
import { day1_2 } from './day-1/day-1-2';

const args: string[] = process.argv.slice(2);
const runDay = (day: string): boolean => {
  return args.length === 0 || args.indexOf(day) !== -1;
};

if (runDay('1')) {
  console.info('Day 1 results are:', day1_1(), ',', day1_2());
}
