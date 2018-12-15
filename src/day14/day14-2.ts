import { input } from './input';

const target = '503761';

export const day14_2 = (): number => {
  const recipes = input.slice(0);
  let elf1 = 0;
  let elf2 = 1;

  for (let i = 0; i < 25000000; i += 1) {
    const recipe1 = recipes[elf1];
    const recipe2 = recipes[elf2];
    const newRecipes = String(recipe1 + recipe2);

    recipes.push(Number(newRecipes[0]));
    if (newRecipes[1]) {
      recipes.push(Number(newRecipes[1]));
    }

    const range = recipes.length;
    elf1 = (elf1 + recipe1 + 1) % range;
    elf2 = (elf2 + recipe2 + 1) % range;
  }
  return recipes.join('').indexOf(target);
};
