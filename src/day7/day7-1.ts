import { stepsChain } from './stepsChain';
import { getFirst } from './getFirst';
import { findNext } from './findNext';

const getChainReaction = (first: string): string => {
  let chain = first;
  // start with the first in the chain
  let stack = stepsChain[first].slice(0).sort();

  while (stack.length > 0) {
    const nextIndex = findNext(stack, chain);

    if (nextIndex === -1) {
      console.error('wtf?', stack, chain, nextIndex);
      throw new Error();
    }
    const next = stack.splice(nextIndex, 1)[0];

    if (!next || chain.includes(next)) {
      continue;
    }
    chain += next;
    const moreSteps = stepsChain[next];

    if (moreSteps) {
      stack = stack.concat(moreSteps).filter((letter, index, newStack) => (
        !chain.includes(letter) &&
        newStack.indexOf(letter) === index
      )).sort();
    }
  }

  return chain;
};

export const day7_1 = (): string => {
  const first: string = getFirst();

  const chain: string = getChainReaction(first);

  return chain;
};
