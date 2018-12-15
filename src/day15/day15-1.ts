import { example } from './input';
import { extractUnits } from './extractUnits';
import { print } from './print';
import { move } from './move';

export const day15_1 = () => {
  const { units, map } = extractUnits(example);

  move(units[0], map, units);
};
