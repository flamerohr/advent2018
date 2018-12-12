import { proliferate } from './proliferate';
import { initial, rules } from './plants';
import { accumulate } from './accumulate';

const GENERATIONS = 50000000000;
export const day12_2 = () => {
  let plants = initial.split('');
  let lowestKey = 0;

  let oldSet = '';
  let offset = null;

  for (let i = 0; i < GENERATIONS; i += 1) {
    const output = proliferate(lowestKey, plants, rules);
    lowestKey = output.lowestKey;
    plants = output.plants;

    const newSet = plants.join('');
    if (oldSet === newSet) {
      offset = lowestKey - i - 1;
      break;
    }
    oldSet = newSet;
  }

  if (offset !== null) {
    return accumulate(offset + GENERATIONS, plants);
  }
  return accumulate(lowestKey, plants);
};
