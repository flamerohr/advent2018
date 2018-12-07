import { stepsChainReverse } from './stepsChain';

export const getFirst = (): string => {
  let letter: string = Object.keys(stepsChainReverse)[0];

  if (!letter) {
    console.error(stepsChainReverse);
    return '';
  }
  while (true) {
    const parent = stepsChainReverse[letter];

    if (!parent) {
      break;
    }
    letter = parent[0];
  }
  return letter;
};
