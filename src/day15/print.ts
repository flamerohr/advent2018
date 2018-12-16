import { Tile, Unit, sortUnits } from './extractUnits';
import { drawMap } from './move';

export const print = (map: Tile[][], units: Unit[]) => {
  const drawnMap = drawMap(map, units);
  const output: string[] = [];

  for (let x = 0; x < drawnMap.length; x += 1) {
    for (let y = 0; y < drawnMap.length; y += 1) {
      if (!output[y]) {
        output[y] = '';
      }
      output[y] += drawnMap[x][y];
    }
  }
  units.sort(sortUnits);
  units.forEach((unit) => {
    output[unit.y] += `  (${unit.type}): ${unit.hp}`;
  });

  console.log(output.join('\n'));
};
