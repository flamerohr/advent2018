import { input as input } from './input';
import { extractUnits, sortUnits } from './extractUnits';
import { print } from './print';
import { move } from './move';
import { attack } from './attack';

export const day15_2 = () => {
  const extraction = extractUnits(input);
  const map = extraction.map;
  let units = extraction.units;
  let round = 0;

  let warWon = false;
  let boost = 0;

  war:
  while (!warWon) {
    warWon = true;
    boost += 1;
    round = 0;
    units = extraction.units.map(unit => ({
      ...unit,
      attack: (unit.type === 'E') ? unit.attack + boost : unit.attack,
    }));
    battle:
    while (true) {
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
          break war;
        }
        const death = attack(unit, units);
        if (death && death.type === 'E') {
          print(map, units);
          warWon = false;
          // console.log('Elf had died!');
          break battle;
        }
        units = units.filter(char => char.hp > 0);
      }

      round += 1;
    }
  }

  const sum = units.reduce(
    (total, unit) => {
      return total + unit.hp;
    },
    0,
  );

  console.log('Boosted:', boost);
  console.log('After round:', round);
  print(map, units);
  return sum * round;
};
