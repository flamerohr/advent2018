import { getDistance } from './getDistance';
import { bounds } from './bounds';
import { Point, points } from './points';

const getTotalDistance = (target: Point): number => {
  return points.reduce(
    (total, point: Point): number => {
      return total + getDistance(target, point);
    },
    0,
  );
};

export const day6_2 = (): number => {
  const maxDistance = 10000;
  let good: number = 0;
  for (let x = bounds.min.x; x < bounds.max.x; x += 1) {
    for (let y = bounds.min.y; y < bounds.max.y; y += 1) {
      const totalDistance = getTotalDistance({ x, y });
      if (totalDistance < maxDistance) {
        good += 1;
      }
    }
  }

  return good;
};
