import { getTotalPowerGrid } from './getPowerLevelGrid';
import { serialNumber } from './serialNumber';

interface Point {
  x: number;
  y: number;
  value: number;
}

export const day11_1 = (): string => {
  // console.log(getPowerLevel(3, 5, 8), 4);
  // console.log(getPowerLevel(122, 79, 57), -5);
  // console.log(getPowerLevel(217, 196, 39), 0);
  // console.log(getPowerLevel(101, 153, 71), 4);

  const totalPowerGrid = getTotalPowerGrid(serialNumber);
  let largest: Point = { x: 0, y: 0, value: 0 };

  totalPowerGrid.forEach((column, x) => {
    column.forEach((value, y) => {
      if (!largest || largest.value < value) {
        largest = {
          x,
          y,
          value,
        };
      }
    });
  });

  if (!largest) {
    throw new Error('something\'s up');
  }
  return `${largest.x},${largest.y}`;
};
