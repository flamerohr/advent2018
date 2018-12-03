import { frequencies } from './frequencies';

export const day1_1 = (): number => {
  const result: number = frequencies
    .reduce((prev: number, frequency: number) => prev + frequency, 0);

  return result;
};
