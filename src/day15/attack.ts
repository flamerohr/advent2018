import { Unit, Tile, sortUnits } from './extractUnits';

export const sortAttackUnits = (a: Unit, b: Unit) => {
  if (a.hp > b.hp) {
    return 1;
  }
  if (a.hp < b.hp) {
    return -1;
  }
  return sortUnits(a, b);
};

export const attack = (unit: Unit, units: Unit[]): Unit|null => {
  const targets = units.filter(getTargets(unit));
  targets.sort(sortAttackUnits);

  const target = targets[0];

  if (target) {
    target.hp -= unit.attack;
    // console.log(target);
    if (target.hp <= 0) {
      return target;
    }
  }
  return null;
};

const getTargets = (unit: Unit) => (enemy: Unit): boolean => (
  enemy.type !== unit.type && (
    enemy.x === unit.x && Math.abs(enemy.y - unit.y) === 1 ||
    Math.abs(enemy.x - unit.x) === 1 && enemy.y === unit.y
  )
);
