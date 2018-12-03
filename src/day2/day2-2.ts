import { ids } from './ids';

const matchLetters = ([source, target]: string[]): string => {
  return source.split('')
    .filter((letter, index) => letter === target[index])
    .join('');
};

export const day2_2 = (): string => {
  const pairs: string[][] = [];
  for (const source of ids) {
    for (const target of ids) {
      pairs.push([source, target]);
    }
  }

  const expectedLength = ids[0].length - 1;
  const id: string|undefined = pairs
    .map(matchLetters)
    .filter(id => id.length === expectedLength)
    .shift();

  if (typeof id !== 'string') {
    throw Error('No id found');
  }
  return id;
};
