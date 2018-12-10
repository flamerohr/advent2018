import { markPoints } from './markPoints';
import { points } from './points';
import { drawPoints } from './drawPoints';
import { stepPoints } from './stepPoints';

export const day10_1 = (): number => {
  const markedPoints = markPoints(points);
  let seconds = 0;
  let currentWidth = 0;
  let currentDraw = null;

  while (true) {
    stepPoints(markedPoints, 1);
    seconds += 1;

    const map: number[] = [];
    let countOver: number = 0;
    markedPoints.forEach((point) => {
      map[point.y] = (map[point.y] || 0) + 1;
      if (map[point.y] === 20) {
        countOver += 1;
      }
    });
    if (countOver >= 5) {
      const newDraw = drawPoints(markedPoints, 1);
      const newWidth = newDraw[0].length;

      if (currentWidth === 0) {
        currentWidth = newWidth;
      }
      if (currentDraw && currentWidth < newWidth) {
        console.log('seconds:', seconds - 1);
        console.log(`${currentDraw.join('\n')}${'\n'}`);
        break;
      }
      currentWidth = newWidth;
      currentDraw = newDraw;
    }
  }

  return seconds - 1;
};
