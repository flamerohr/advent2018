import { steps } from './steps';

export interface Chain {
  [index: string]: string[];
}

const parser: RegExp = /^Step (\w) must be finished before step (\w) can begin.$/;

const sortSteps = (chain: Chain, step: string): Chain => {
  const parts = step.match(parser);
  if (!parts) {
    console.error(step);
    return chain;
  }
  const parent = parts[1];
  const child = parts[2];

  if (!chain[parent]) {
    chain[parent] = [];
  }

  chain[parent].push(child);
  return chain;
};

const sortReverseSteps = (chain: Chain, step: string): Chain => {
  const parts = step.match(parser);
  if (!parts) {
    console.error(step);
    return chain;
  }
  const parent = parts[1];
  const child = parts[2];

  if (!chain[child]) {
    chain[child] = [];
  }

  chain[child].push(parent);
  return chain;
};
export const stepsChain: Chain = steps.reduce(sortSteps, {});

export const stepsChainReverse: Chain = steps.reduce(sortReverseSteps, {});
