import { Tile } from './getMap';
import { print } from './print';
import { Point, tick } from './tick';

export const animate = (initial: Tile[][], initialActives: Point[]) => {
  let map = initial;
  let actives = initialActives;
  let lowest = 0;

  const runTick = () => {
    if (actives[0].y > lowest) {
      lowest = Math.max(actives[0].y, 1);
    }
    const next = tick(map, actives);
    map = next.map;
    actives = next.actives;
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    print(map, actives, lowest);
    if (actives.length > 0) {
      setTimeout(runTick, 250);
    }
  };
  print(map, actives, 1);
  setTimeout(runTick, 250);
};
