import { Unit, Tile } from './extractUnits';

export const sortAttackUnits = (a: Unit, b: Unit) => {
  if (a.hp > b.hp) {
    return 1;
  }
  if (a.hp < b.hp) {
    return -1;
  }
  if (a.y > b.y) {
    return 1;
  }
  if (a.y < b.y) {
    return -1;
  }
  if (a.x > b.x) {
    return 1;
  }
  if (a.x < b.x) {
    return -1;
  }
  return 0;
};

export const getAttackTarget = (unit: Unit, units: Unit[]): Unit => {
  const targets = units.filter(getTargets(unit));
  targets.sort(sortAttackUnits);

  const target = targets[0];

  return target;
};

const getTargets = (unit: Unit) => (enemy: Unit): boolean => (
  enemy.type !== unit.type && (
    enemy.x === unit.x && Math.abs(enemy.y - unit.y) === 1 ||
    Math.abs(enemy.x - unit.x) === 1 && enemy.y === unit.y
  )
);
