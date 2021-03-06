import { print } from './print';
import { tick } from './tick';
import { Tile } from './getMap';

export const animate = (initial: Tile[][]) => {
  let map = initial;
  let time = 0;

  const runTick = () => {
    time += 1;
    map = tick(map);
    console.log('');
    console.log('minute:', time);
    print(map);

    if (time <= 2000) {
      setTimeout(runTick, 200);
    }
  };

  print(map);
  setTimeout(runTick, 200);
};
