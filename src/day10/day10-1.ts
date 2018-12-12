import { markPoints, Point } from './markPoints';
import { points } from './points';
import { drawPoints } from './drawPoints';
import { stepPoints } from './stepPoints';

const getHeight = (markedPoints: Point[]) => {
  const vertical = markedPoints.map(point => point.y);
  const minY = Math.min(...vertical);
  const maxY = Math.max(...vertical);
  return maxY - minY;
};

export const day10_1 = (): number => {
  const markedPoints = markPoints(points);
  const x = markedPoints
    .reduce(
      (smallest: number | null, point) => {
        if (!point.dX) {
          return smallest;
        }

        const goal = point.x / point.dX * -1;
        if (smallest === null) {
          return goal;
        }

        return Math.min(smallest || 0, goal);
      },
      null,
    ) || 0;

  let seconds = Math.floor(x - 1);
  let currentHeight = getHeight(markedPoints);

  console.log('start:', seconds);
  stepPoints(markedPoints, seconds);
  while (true) {
    stepPoints(markedPoints, 1);
    seconds += 1;

    const newHeight = getHeight(markedPoints);

    if (newHeight > currentHeight) {
      stepPoints(markedPoints, -1);
      seconds -= 1;
      console.log(`${drawPoints(markedPoints, 1).join('\n')}${'\n'}`);
      break;
    }
    currentHeight = newHeight;
  }

  return seconds;
};
