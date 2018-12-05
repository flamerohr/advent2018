import { polymer } from './polymer';
import { startReaction } from './startReaction';

interface CountMap {
  [index: string]: number;
}

const countLetterRemove = (prev: CountMap, letter: string) => {
  const parser = new RegExp(letter, 'ig');
  const newPolymer = polymer.replace(parser, '');

  const result = startReaction(newPolymer).length;
  prev[letter] = result;

  return prev;
};

export const day5_2 = (): number => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const count: CountMap = letters.reduce(countLetterRemove, {});

  const shortest: string = Object
    .keys(count)
    .reduce(
      (prev: string, letter: string) => {
        if (!prev) {
          return letter;
        }
        if (count[prev] > count[letter]) {
          return letter;
        }
        return prev;
      },
      '',
    );

  return count[shortest];
};
