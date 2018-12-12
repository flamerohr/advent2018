export const accumulate = (lowestKey: number, plants: string[]) => {
  let total = 0;
  for (let i = 0; i < plants.length; i += 1) {
    if (plants[i] === '#') {
      total += lowestKey + i;
    }
  }

  return total;
}
