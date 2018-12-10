export interface Point {
  x: number;
  y: number;
  dX: number;
  dY: number;
}

export const positionParser = /^position=\<\s?([\d-]+), \s{0,}([\d-]+)\>/;
export const velocityParser = /velocity=\<\s?([\d-]+), \s{0,}([\d-]+)\>$/;

export const parsePoint = (description: string): Point => {
  const position = description.match(positionParser);
  const velocity = description.match(velocityParser);

  if (!position || !velocity) {
    throw new Error('something\'s up');
  }
  return {
    x: Number(position[1]),
    y: Number(position[2]),
    dX: Number(velocity[1]),
    dY: Number(velocity[2]),
  };
};

export const markPoints = (points: string[]): Point[] => {
  return points.map(parsePoint);
};
