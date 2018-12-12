import { proliferate } from './proliferate';
import { initial, rules } from './plants';
import { accumulate } from './accumulate';

export const day12_1 = () => {
  let plants = initial.split('');
  let lowestKey = 0;

  for (let i = 0; i < 20; i += 1) {
    const output = proliferate(lowestKey, plants, rules);
    lowestKey = output.lowestKey;
    plants = output.plants;
  }

  return accumulate(lowestKey, plants);
};
