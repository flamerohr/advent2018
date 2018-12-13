import { Cart } from './cart';

export enum Direction {
  up = '^',
  down = 'v',
  left = '<',
  right = '>',
}

export type Tracks = '|' | '-' | '\\' | '/' | '+';

export type Tile = Tracks | '' | 'X' | Direction;

export const getMap = (input: string): { map: Tile[][], carts: Cart[] } => {
  const lines = input.split('\n');
  const maxX = Math.max(...lines.map((line: string) => line.length));
  const map: Tile[][] = [];
  const carts: Cart[] = [];
  const directions: Tile[] = [Direction.up, Direction.down, Direction.left, Direction.right];

  for (let x = 0; x < maxX; x += 1) {
    if (!map[x]) {
      map[x] = [];
    }
    for (let y = 0; y < lines.length; y += 1) {
      const line = lines[y];
      const tile = line[x] as Tile || '';

      if (directions.indexOf(tile) === -1) {
        map[x][y] = tile;
      } else {
        const direction = tile as Direction;
        const cart = new Cart(carts.length, x, y, direction, map);
        carts.push(cart);

        if (direction === '>' || direction === '<') {
          map[x][y] = '-';
        } else {
          map[x][y] = '|';
        }
      }
    }
  }
  return {
    map,
    carts,
  };
};
