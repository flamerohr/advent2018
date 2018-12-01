import { frequencies } from './frequencies';

function* generateResults(): IterableIterator<number> {
  let index: number = 0;
  let results: number = 0;

  yield results;

  while (true) {
    results += frequencies[index];
    yield results;
    index = (index + 1) % frequencies.length;
  }
}

export const day1_2 = (): number => {
  const resultsList: number[] = [];
  let results: number|null = null;

  for (const step of generateResults()) {
    if (resultsList.indexOf(step) !== -1) {
      results = step;
      break;
    }
    resultsList.push(step);
  }
  return Number(results);
};
