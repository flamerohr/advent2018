import { input as input } from './input';
import { extractUnits, sortUnits, Unit } from './extractUnits';
import { print } from './print';
import { move } from './move';
import { attack } from './attack';

export const day15_1 = () => {
  const extraction = extractUnits(input);
  const map = extraction.map;
  let units = extraction.units;
  let round = 0;

  battle:
  while (true) {
    // console.log('End round:', round);
    // print(map, units);
    units.sort(sortUnits);
    const order = units;
    for (let i = 0; i < order.length; i += 1) {
      const unit = order[i];
      if (unit.hp <= 0) {
        continue;
      }
      move(unit, map, units);
      if (
        units.filter(char => char.type === 'E').length === 0 ||
        units.filter(char => char.type === 'G').length === 0
      ) {
        break battle;
      }
      const death = attack(unit, units);
      units = units.filter(char => char.hp > 0);
      if (death) {
        console.log('Death round: ', round, death);
      }
    }

    round += 1;
  }

  console.log('After round:', round);
  print(map, units);

  const sum = units.reduce(
    (total, unit) => {
      return total + unit.hp;
    },
    0,
  );

  return sum * round;
};
