import { Tile, Unit, sortUnits } from './extractUnits';
import { drawMap } from './move';

export const print = (map: Tile[][], units: Unit[]) => {
  const drawnMap = drawMap(map, units);
  const output: string[] = [];

  for (let x = 0; x < drawnMap.length; x += 1) {
    for (let y = 1; y <= drawnMap[0].length; y += 1) {
      if (!output[y]) {
        output[y] = `${y <= 10 ? '0' : ''}${y - 1}  `;
      }
      output[y] += drawnMap[x][y - 1];
    }
  }
  units.sort(sortUnits);
  units.forEach((unit) => {
    output[unit.y] += `  (${unit.type}-${unit.id}): ${unit.hp}`;
  });

  console.log(output.join('\n'));
};
