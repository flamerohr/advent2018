import { input } from './input';
import { Circle, LinkedItem } from './circle';

const practice = 503761;

const step = (item: LinkedItem, factor: number): LinkedItem => {
  let newItem = item;

  for (let i = 0; i < factor; i += 1) {
    newItem = newItem.next as LinkedItem;
  }
  return newItem;
};

export const day14_1 = (): string => {
  const circle = new Circle(input);
  let elf1 = circle.first;
  let elf2 = elf1.next as LinkedItem;

  while (circle.index < practice + 10) {
    // circle.print(elf1, elf2);
    const newRecipes = String(elf1.value + elf2.value).split('').map(Number);

    newRecipes.forEach(recipe => circle.push(recipe));

    elf1 = step(elf1, elf1.value + 1);
    elf2 = step(elf2, elf2.value + 1);
  }

  let print = step(circle.first, practice);
  let results = '';
  for (let i = 0; i < 10; i += 1) {
    results += String(print.value);
    print = print.next as LinkedItem;
  }
  return results;
};
