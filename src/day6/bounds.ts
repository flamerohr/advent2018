import { Point, points } from './points';

export interface Bounds {
  min: Point;
  max: Point;
}

enum planes {
  x = 'x',
  y = 'y',
}

const getBounds = (): Bounds => {
  const rangeX = points.map(point => point.x);
  const rangeY = points.map(point => point.y);
  const bounds: Bounds = {
    min: { x: Math.min(...rangeX), y: Math.min(...rangeY) },
    max: { x: Math.max(...rangeX), y: Math.max(...rangeY) },
  };

  return bounds;
};

export const bounds: Bounds = getBounds();
