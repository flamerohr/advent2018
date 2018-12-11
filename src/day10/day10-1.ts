import { markPoints } from './markPoints';
import { points } from './points';
import { drawPoints } from './drawPoints';
import { stepPoints } from './stepPoints';

export const day10_1 = (): number => {
  const markedPoints = markPoints(points);
  const x = markedPoints
    .reduce((total, point) => total + (point.x / point.dX * -1), 0)
    / markedPoints.length;

  let seconds = Math.floor(x * 0.99);
  let currentHeight = 0;

  console.log('offset:', seconds, x);
  stepPoints(markedPoints, seconds);
  while (true) {
    stepPoints(markedPoints, 1);
    seconds += 1;

    const vertical = markedPoints.map(point => point.y);
    const minY = Math.min(...vertical);
    const maxY = Math.max(...vertical);
    const newHeight = maxY - minY;
    if (currentHeight && newHeight > currentHeight) {
      stepPoints(markedPoints, -1);
      console.log(`${drawPoints(markedPoints, 1).join('\n')}${'\n'}`);
      console.log('seconds:', seconds - 1);
      break;
    }
    currentHeight = newHeight;
  }

  return seconds - 1;
};