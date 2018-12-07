import { stepsChain } from './stepsChain';
import { getFirst } from './getFirst';
import { stepDuration } from './stepDuration';
import { findNext } from './findNext';

interface Worker {
  step: string | null;
  timeLeft: number;
}

const runChainReaction = (first: string): number => {
  let chain = '';
  // start with the first in the chain
  let stack = stepsChain[first].slice(0).sort();
  let timer = 0;
  let workers: Worker[] = [{
    step: first,
    timeLeft: stepDuration[first],
  }];

  while (stack.length > 0 || workers.length > 0) {

    workers = workers.filter((worker) => {
      worker.timeLeft -= 1;

      if (worker.timeLeft === 0) {
        chain += worker.step;

        return false;
      }
      return true;
    });

    timer += 1;
    while (workers.length < 5) {
      const nextIndex = findNext(stack, chain);
      if (nextIndex === -1) {
        break;
      }
      const next = stack.splice(nextIndex, 1)[0];

      if (!next || chain.includes(next)) {
        break;
      }
      workers.push({
        step: next,
        timeLeft: stepDuration[next],
      });
      const moreSteps = stepsChain[next];

      if (moreSteps) {
        stack = stack.concat(moreSteps).filter((letter, index, newStack) => (
          !chain.includes(letter) &&
          newStack.indexOf(letter) === index
        )).sort();
      }
    }
  }

  return timer;
};

export const day7_2 = (): number => {
  const first = getFirst();

  const duration = runChainReaction(first);

  return duration;
};
