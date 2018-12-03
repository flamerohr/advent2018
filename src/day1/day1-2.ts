import { frequencies } from './frequencies';

function* generateResults(): IterableIterator<number> {
  const { length } = frequencies;
  let results: number = 0;

  for (let index = 0; index < length; index = (index + 1) % length) {
    yield results;
    results += frequencies[index];
  }
}

export const day1_2 = (): number => {
  const resultsList: number[] = [];

  for (const step of generateResults()) {
    if (resultsList.indexOf(step) !== -1) {
      return step;
    }
    resultsList.push(step);
  }

  throw Error('No frequency found');
};
