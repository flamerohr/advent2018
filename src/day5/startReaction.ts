export const startReaction = (polymer: string): string => {
  const state: string[] = polymer.split('');

  for (let index = 0; index < state.length; index += 1) {
    const current = state[index];
    const next = state[index + 1];

    if (next && current &&
      next.toLowerCase() === current.toLowerCase() &&
      next !== current) {
      state.splice(index, 2);

      // go back, just in case a reaction to the previous character happens
      index -= 2;
    }
  }

  return state.join('');
};
