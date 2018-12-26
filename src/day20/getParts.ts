
export enum Direction {
  N = 'N',
  W = 'W',
  E = 'E',
  S = 'S',
}

export const directionList: Direction[] = [
  Direction.N,
  Direction.W,
  Direction.E,
  Direction.S,
];

export interface Part extends Array<Part | Direction> {}

export const getParts = (description: string[]): Part => {
  const newParts: Part[] = [[]];

  while (description.length) {
    const step = description.shift();
    if (step === '^') {
      continue;
    }
    if (directionList.indexOf(step as Direction) !== -1) {
      newParts[newParts.length - 1].push(step as Direction);
    }
    if (step === '|') {
      newParts.push([]);
    }
    if (step === '(') {
      const parts = getParts(description);
      newParts[newParts.length - 1].push(parts);
    }
    if (step === ')') {
      return newParts;
    }
    if (step === '$') {
      return newParts[0];
    }
  }

  return newParts;
};
