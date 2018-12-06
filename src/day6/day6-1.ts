import { bounds } from './bounds';
import { markedPoints, MarkedPoint } from './markedPoints';
import { Point } from './points';
import { getDistance } from './getDistance';

interface Distances {
  [index: number]: number;
}

const getClosestPoint = (target: Point): MarkedPoint | null => {
  const distances: Distances = markedPoints.reduce(
    (map: Distances, point: MarkedPoint) => {
      const distance: number = getDistance(target, point);

      map[point.id] = distance;
      return map;
    },
    {},
  );

  let same: boolean = false;
  const closest = markedPoints
    .reduce(
      (oldPoint: MarkedPoint | null, newPoint: MarkedPoint): MarkedPoint | null => {
        if (!oldPoint) {
          same = false;
          return newPoint;
        }
        const oldDistance = distances[oldPoint.id];
        const newDistance = distances[newPoint.id];
        if (oldDistance > newDistance) {
          same = false;
          return newPoint;
        }
        if (oldDistance === newDistance) {
          same = true;
        }
        return oldPoint;
      },
      null,
    );

  if (same) {
    return null;
  }
  return closest;
};

export const day6_1 = (): number => {
  // const map: number[][] = [];
  const count: number[] = [];
  const banned: number[] = [];

  for (let x = bounds.min.x; x <= bounds.max.x; x += 1) {
    for (let y = bounds.min.y; y <= bounds.max.y; y += 1) {
      const closest = getClosestPoint({ x, y });
      if (!closest) {
        continue;
      }
      count[closest.id] = (count[closest.id] || 0) + 1;
      if ((bounds.min.x === x ||
        bounds.min.y === y ||
        bounds.max.x === x ||
        bounds.max.y === y) &&
        banned.indexOf(closest.id) === -1
      ) {
        banned.push(closest.id);
      }
    }
  }

  const highest = count.reduce(
    (prev, next, id) => {
      if (prev < next && banned.indexOf(id) === -1) {
        return next;
      }
      return prev;
    },
    0,
  );

  return highest;
};
