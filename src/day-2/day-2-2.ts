import { ids } from './ids';

const matchLetters = (source: string, target: string) => {
  let results = '';
  let errors = 0;

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
  const results: string[] = [];
  ids.forEach((source) => {
    ids.forEach((target) => {
      const match = matchLetters(source, target);

      if (match && results.indexOf(match) === -1) {
        results.push(match);
      }
    });
  });

  return results.shift() || '';
};