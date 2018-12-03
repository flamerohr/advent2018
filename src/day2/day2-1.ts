import { ids } from './ids';

interface Mapping { [key: string]: number; }

const countLetters = (text: string) => {
  const mapping: Mapping = {};
  for (const letter of text) {
    if (!mapping[letter]) {
      mapping[letter] = 0;
    }
    mapping[letter] += 1;
  }

  return mapping;
};

const hasCount = (mapping: Mapping, count: number) => {
  for (const letter of Object.keys(mapping)) {
    if (mapping[letter] === count) {
      return true;
    }
  }
  return false;
};

export const day2_1 = (): number => {
  const mappings: Mapping[] = ids
    .map(countLetters);

  const count2: number = mappings
    .filter(mapping => hasCount(mapping, 2))
    .length;
  const count3: number = mappings
    .filter(mapping => hasCount(mapping, 3))
    .length;

  return count2 * count3;
};
