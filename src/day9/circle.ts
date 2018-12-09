export interface LinkedItem {
  value: number;
  next?: LinkedItem;
  prev?: LinkedItem;
}

export class Circle {
  current: LinkedItem = {
    value: 0,
  };

  zeroValue: LinkedItem;

  constructor() {
    this.current.next = this.current;
    this.current.prev = this.current;

    this.zeroValue = this.current;
  }

  print() {
    let current = this.zeroValue;
    const print = [];

    do {
      print.push(current === this.current ? `(${current.value})` : ` ${current.value} `);
      const { next } = current;
      if (!next) {
        throw new Error('something\' up');
      }
      current = next;
    } while (current !== this.zeroValue);

    console.log(print.join('-'));
  }

  push(value: number) {
    const { next } = this.current;
    if (!next) {
      throw new Error(`something's up: ${value}`);
    }

    const { next: newNext } = next;
    if (!newNext) {
      throw new Error(`something's up: ${value}`);
    }
    const newItem: LinkedItem = {
      value,
    };

    next.next = newItem;
    newItem.prev = next;

    newItem.next = newNext;
    newNext.prev = newItem;

    this.current = newItem;
  }

  pop() {
    let current = this.current;

    for (let i = 0; i < 7; i += 1) {
      const newPrev = current.prev;
      if (!newPrev) {
        throw new Error('something\'s up');
      }
      current = newPrev;
    }
    const { next, prev } = current;
    if (!next || !prev) {
      throw new Error('something\'s up');
    }

    next.prev = prev;
    prev.next = next;

    this.current = next;

    // ensures print() doesn't break
    if (current === this.zeroValue) {
      this.zeroValue = this.current;
    }
    return current;
  }
}
