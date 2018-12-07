import { stepsChainReverse } from './stepsChain';

export const findNext = (stack: string[], chain: string) => {
  for (let i = 0; i < stack.length; i += 1) {
    const letter: string = stack[i];
    let parents = stepsChainReverse[letter];

    if (!parents) {
      return i;
    }
    parents = parents.slice(0);
    for (let j = 0; j < parents.length; j += 1) {
      const parent = parents[j];

      if (chain.includes(parent)) {
        parents.shift();
        j -= 1;
      }
    }
    if (parents.length === 0) {
      return i;
    }
  }
  return -1;
};
