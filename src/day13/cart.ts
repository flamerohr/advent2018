import { Tile, Direction } from './map';

export enum Turn {
  left,
  straight,
  right,
}

export const sortCarts = (a: Cart, b: Cart) => {
  if (a.y > b.y) {
    return 1;
  }
  if (a.y < b.y) {
    return -1;
  }
  if (a.x > b.x) {
    return 1;
  }
  if (a.x < b.x) {
    return -1;
  }
  return 0;
};

export class Cart {
  id: number;
  x: number = 0;
  y: number = 0;
  facing: Direction = Direction.up;
  nextTurn: Turn = Turn.left;

  map: Tile[][] = [];

  constructor(id: number, x: number, y: number, facing: Direction, map: Tile[][]) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.facing = facing;

    this.map = map;
  }

  rotate(): Direction {
    switch (this.nextTurn) {
      case Turn.left: {
        this.nextTurn = Turn.straight;
        return this.turnLeft();
      }
      case Turn.right: {
        this.nextTurn = Turn.left;
        return this.turnRight();
      }
    }
    this.nextTurn = Turn.right;
    return this.facing;
  }

  turnRight(): Direction {
    switch (this.facing) {
      case Direction.left: {
        return Direction.up;
      }
      case Direction.right: {
        return Direction.down;
      }
      case Direction.up: {
        return Direction.right;
      }
      case Direction.down: {
        return Direction.left;
      }
    }
  }

  turnLeft(): Direction {
    switch (this.facing) {
      case Direction.left: {
        return Direction.down;
      }
      case Direction.right: {
        return Direction.up;
      }
      case Direction.up: {
        return Direction.left;
      }
      case Direction.down: {
        return Direction.right;
      }
    }
  }

  turn(current: '/' | '\\'): Direction {
    switch (this.facing) {
      case Direction.left: {
        return current === '/' ? Direction.down : Direction.up;
      }
      case Direction.right: {
        return current === '/' ? Direction.up : Direction.down;
      }
      case Direction.up: {
        return current === '/' ? Direction.right : Direction.left;
      }
      case Direction.down: {
        return current === '/' ? Direction.left : Direction.right;
      }
    }
  }

  getNextDirection(): Direction {
    const current = this.map[this.x][this.y];

    switch (current) {
      case '-':
      case '|': {
        // assume already facing the right direction
        return this.facing;
      }
      case '/':
      case '\\': {
        return this.turn(current);
      }
      case '+': {
        return this.rotate();
      }
    }
    console.log('current:', this);
    throw new Error('wtf');
  }

  forward() {
    const direction: Direction = this.getNextDirection();
    this.facing = direction;
    switch (direction) {
      case Direction.up: {
        this.y -= 1;
        break;
      }
      case Direction.down: {
        this.y += 1;
        break;
      }
      case Direction.left: {
        this.x -= 1;
        break;
      }
      case Direction.right: {
        this.x += 1;
        break;
      }
    }
    return this;
  }
}
