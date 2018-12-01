import { frequencies } from './frequencies';

export const day1_1 = (): number => {
  const result: number = frequencies
    .reduce((prev, frequency) => prev + frequency, 0);

  return result;
};
