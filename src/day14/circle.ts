import { Reset, BgRed, BgBlue } from '../colours';

export interface LinkedItem {
  value: number;
  next?: LinkedItem;
  prev?: LinkedItem;
}

export class Circle {
  current: LinkedItem = {
    value: 0,
  };

  first: LinkedItem;

  index: number = 0;

  constructor(initial: number[]) {
    this.current.value = initial[0];
    this.current.next = this.current;
    this.current.prev = this.current;

    this.first = this.current;

    for (let i = 1; i < initial.length; i += 1) {
      this.push(initial[i]);
    }
  }

  print(elf1?: LinkedItem, elf2?: LinkedItem) {
    let current = this.first;
    const print = [];

    do {
      let value: number|string = current.value;

      if (current === elf1) {
        value = `${BgBlue}${current.value}${Reset}`;
      }
      if (current === elf2) {
        value = `${BgRed}${current.value}${Reset}`;
      }
      print.push(value);
      const { next } = current;
      current = next as LinkedItem;
    } while (current !== this.first);

    console.log(print.join(''));
  }

  push(value: number) {
    const current = this.current;
    const newItem: LinkedItem = {
      value,
    };

    const currentNext = current.next as LinkedItem;
    newItem.next = currentNext;
    current.next = newItem;

    currentNext.prev = newItem;
    newItem.prev = current;

    this.index += 1;
    this.current = newItem;
  }
}
