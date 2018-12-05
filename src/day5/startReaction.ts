export const startReaction = (polymer: string): string => {
  let index = 0;
  const reacting: string[] = polymer.split('');

  while (index < reacting.length) {
    const current = reacting[index];
    const next = reacting[index + 1];

    if (next && current &&
      next.toLowerCase() === current.toLowerCase() &&
      next !== current) {
      reacting.splice(index, 2);

      // go back, just in case a reaction to the previous character happens
      index -= 1;
    } else {
      index += 1;
    }
  }

  return reacting.join('');
};
