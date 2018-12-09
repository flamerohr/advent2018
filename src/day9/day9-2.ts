import { playGameLinked } from './playGameLinked';

import { examples } from './rules';

// export const day9_2 = () => [playGameLinked(examples[3]), examples[3].winner];

export const day9_2 = () => playGameLinked({
  players: 465,
  last: 7149800,
});
