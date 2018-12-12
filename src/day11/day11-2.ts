import { getTotalPowerGridSize } from './getPowerLevelGrid';
import { serialNumber } from './serialNumber';

interface Point {
  x: number;
  y: number;
  z: number;
  value: number;
}

export const day11_2 = (): string => {
  const totalPowerGrid = getTotalPowerGridSize(serialNumber);
  let largest: Point = { x: 0, y: 0, z: 0, value: 0 };

  totalPowerGrid.forEach((column, x) => {
    column.forEach((row, y) => {
      row.forEach((value, z) => {
        if (!largest || largest.value < value) {
          largest = {
            x,
            y,
            z,
            value,
          };
        }
      });
    });
  });

  if (!largest) {
    throw new Error('something\'s up');
  }
  return `${largest.x},${largest.y},${largest.z}`;
};
