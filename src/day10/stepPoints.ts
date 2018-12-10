import { Point } from './markPoints';

export const stepPoints = (points: Point[], scale = 500): void => {
  points.forEach((point) => {
    point.x = point.x + point.dX * scale;
    point.y = point.y + point.dY * scale;
  });
};
