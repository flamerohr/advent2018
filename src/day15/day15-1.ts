import { input } from './input';
import { extractUnits, sortUnits, Unit } from './extractUnits';
import { print } from './print';
import { move } from './move';
import { getAttackTarget } from './attack';

export const day15_1 = () => {
  const extraction = extractUnits(input);
  const map = extraction.map;
  let units = extraction.units;
  let round = 0;

  battle:
  while (true) {
    units.sort(sortUnits);
    const order = units;
    for (let i = 0; i < order.length; i += 1) {
      if (
        units.filter(char => char.type === 'E').length === 0 ||
        units.filter(char => char.type === 'G').length === 0
      ) {
        break battle;
      }
      const unit = order[i];
      if (unit.hp <= 0) {
        continue;
      }
      const target = getAttackTarget(unit, units);
      if (!target) {
        move(unit, map, units);
      }
      if (target) {
        target.hp -= unit.attack;
      }
      units = units.filter(char => char.hp > 0);
    }

    round += 1;
    // console.log('After round:', round);
    // print(map, units);
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
