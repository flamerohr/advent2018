import { ids } from './ids';

const matchLetters = (source: string, target: string): string => {
  let results: string = '';
  let errors: number = 0;

  if (source === target) {
    return '';
  }
  for (let i = 0; i < source.length; i += 1) {
    if (source[i] === target[i]) {
      results += source[i];
    } else {
      errors += 1;
    }
    if (errors >= 2) {
      return '';
    }
  }
  return results;
};

export const day2_2 = (): string => {
  for (const source of ids) {
    for (const target of ids) {
      const match = matchLetters(source, target);

      if (match) {
        return match;
      }
    }
  }
  return '';
};
