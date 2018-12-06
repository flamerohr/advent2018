import { points, Point } from './points';

export interface MarkedPoint extends Point {
  id: number;
}

export const markedPoints = points
  .map((point, id) => ({ ...point, id }));
