import { polymer } from './polymer';
import { startReaction } from './startReaction';

export const day5_1 = (): number => {
  return startReaction(polymer).length;
};
