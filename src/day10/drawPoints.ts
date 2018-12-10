import { Point } from './markPoints';

const padding = 2;
export const drawPoints = (points: Point[], scale = 500): string[] => {
  const horizontal = points.map(point => Math.floor(point.x / scale));
  const vertical = points.map(point => Math.floor(point.y / scale));

  const map: any = {};

  points.forEach((point) => {
    if (!map[Math.floor(point.y / scale)]) {
      map[Math.floor(point.y / scale)] = {};
    }

    map[Math.floor(point.y / scale)][Math.floor(point.x / scale)] = 'X';
  });

  const output: string[] = [];
  const offset = Math.abs(Math.min(...vertical)) + padding;
  const minY = Math.min(...vertical) - padding;
  const maxY = Math.max(...vertical) + padding;
  const minX = Math.min(...horizontal) - padding;
  const maxX = Math.max(...horizontal) + padding;

  for (let y = minY; y <= maxY; y += 1) {
    if (!map[y]) {
      map[y] = {};
    }
    const temp = [];
    for (let x = minX; x <= maxX; x += 1) {
      temp.push(map[y][x] || '.');
    }
    output[y + offset] = temp.join('');
  }

  return output.filter(line => line);
};
