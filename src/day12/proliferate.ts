import { Rules } from './plants';

export interface ProliferateOutput {
  lowestKey: number;
  plants: string[];
}

export const proliferate = (
  lowestKey: number,
  plants: string[],
  rules: Rules,
): ProliferateOutput => {
  const newPlants: string[] = [];
  let newLowestKey: number = lowestKey;

  let cache = [];
  for (let i = -2; i < plants.length + 2; i += 1) {
    const condition = [-2, -1, 0, 1, 2].reduce(
      (list: string[], offset) => {
        const pot = plants[i + offset] || '.';

        list.push(pot);

        return list;
      },
      [],
    );

    const plant = rules[condition.join('')] || '.';
    if (plant === '#') {
      if (newPlants.length === 0) {
        newLowestKey = newLowestKey + i;
      }
      cache.forEach(() => newPlants.push('.'));
      newPlants.push('#');

      cache = [];
    } else if (newPlants.length > 0) {
      cache.push(i);
    }
  }

  return { lowestKey: newLowestKey, plants: newPlants };
};
