import { Point } from './points';

export const getDistance = (point1: Point, point2: Point): number => {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
};
