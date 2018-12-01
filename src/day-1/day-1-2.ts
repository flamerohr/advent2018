import { frequencies } from './frequencies';

export const day1_2 = (): number => {
  let result: number = 0;
  const resultsList: number[] = [0];
  let repeat: number|null = null;
  let loop = 0;

  while (repeat == null) {
    for (let i = 0; i < frequencies.length; i += 1) {
      const frequency = frequencies[i];
      result += frequency;

      if (resultsList.indexOf(result) !== -1) {
        repeat = result;
        break;
      }
      resultsList.push(result);
    }
    loop += 1;
  }

  return repeat;
};
